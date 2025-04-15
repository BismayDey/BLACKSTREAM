"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { Loader2, X, Trash2, Clock, Film, Save, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [watchHistory, setWatchHistory] = useState<any[]>([])

  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // If auth is not available yet, show a loading state
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading profile...</h2>
          <p className="text-muted-foreground">Please wait while we fetch your profile data</p>
        </div>
      </div>
    )
  }

  const { user, signOut, updateUserProfile, updateUserData, getUserData } = auth

  const fetchUserData = useCallback(async () => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      const data = await getUserData()
      setUserData(data)
      setDisplayName(user.displayName || "")
      setPhotoURL(user.photoURL || "")
      setWatchlist(data?.watchlist || [])
      setWatchHistory(data?.watchHistory || [])
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }, [user, router, getUserData, toast])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const handleProfileUpdate = async () => {
    setIsSaving(true)
    try {
      await updateUserProfile({
        displayName,
        photoURL,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreferenceUpdate = async (key: string, value: any) => {
    try {
      const updatedSettings = {
        ...userData.settings,
        [key]: value,
      }

      await updateUserData({
        settings: updatedSettings,
      })

      setUserData({
        ...userData,
        settings: updatedSettings,
      })

      toast({
        title: "Preferences updated",
        description: `${key.charAt(0).toUpperCase() + key.slice(1)} preference has been updated.`,
      })
    } catch (error) {
      console.error("Error updating preferences:", error)
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromWatchlist = async (showId: string) => {
    try {
      const updatedWatchlist = watchlist.filter((item: any) => item.showId !== showId)

      await updateUserData({
        watchlist: updatedWatchlist,
      })

      setWatchlist(updatedWatchlist)

      toast({
        title: "Removed from watchlist",
        description: "The show has been removed from your watchlist.",
      })
    } catch (error) {
      console.error("Error removing from watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove from watchlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleClearWatchHistory = async () => {
    try {
      await updateUserData({
        watchHistory: [],
      })

      setWatchHistory([])

      toast({
        title: "Watch history cleared",
        description: "Your watch history has been cleared successfully.",
      })
    } catch (error) {
      console.error("Error clearing watch history:", error)
      toast({
        title: "Error",
        description: "Failed to clear watch history. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromHistory = async (showId: string) => {
    try {
      const updatedHistory = watchHistory.filter((item: any) => item.showId !== showId)

      await updateUserData({
        watchHistory: updatedHistory,
      })

      setWatchHistory(updatedHistory)

      toast({
        title: "Removed from history",
        description: "The show has been removed from your watch history.",
      })
    } catch (error) {
      console.error("Error removing from history:", error)
      toast({
        title: "Error",
        description: "Failed to remove from history. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading profile...</h2>
          <p className="text-muted-foreground">Please wait while we fetch your profile data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details and manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoURL || "/placeholder.svg?height=96&width=96"} />
                    <AvatarFallback>{displayName?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-medium">{displayName || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photoUrl">Profile Picture URL</Label>
                    <Input
                      id="photoUrl"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    <p className="text-xs text-muted-foreground">Enter a URL to an image for your profile picture</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Subscription</h3>
                <div className="bg-primary/10 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Free Plan</p>
                    <p className="text-sm text-muted-foreground">Limited access to content</p>
                  </div>
                  <Button onClick={() => router.push("/subscription")}>Upgrade</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button onClick={handleProfileUpdate} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your viewing preferences and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoplay">Autoplay</Label>
                    <p className="text-sm text-muted-foreground">Automatically play the next episode</p>
                  </div>
                  <Switch
                    id="autoplay"
                    checked={userData?.settings?.autoplay}
                    onCheckedChange={(checked) => handlePreferenceUpdate("autoplay", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about new content</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={userData?.settings?.notifications}
                    onCheckedChange={(checked) => handlePreferenceUpdate("notifications", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitlesLanguage">Subtitles Language</Label>
                  <select
                    id="subtitlesLanguage"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={userData?.settings?.subtitlesLanguage}
                    onChange={(e) => handlePreferenceUpdate("subtitlesLanguage", e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Preferred Quality</Label>
                  <select
                    id="quality"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={userData?.settings?.quality}
                    onChange={(e) => handlePreferenceUpdate("quality", e.target.value)}
                  >
                    <option value="auto">Auto</option>
                    <option value="low">Low (480p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="high">High (1080p)</option>
                    <option value="ultra">Ultra HD (4K)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Watchlist</CardTitle>
              <CardDescription>Shows and movies you've saved to watch later</CardDescription>
            </CardHeader>
            <CardContent>
              {watchlist.length === 0 ? (
                <div className="text-center py-8">
                  <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">Your watchlist is empty</h3>
                  <p className="text-muted-foreground mb-4">Add shows and movies to your watchlist to find them here</p>
                  <Button onClick={() => router.push("/shows")}>Browse Shows</Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {watchlist.map((item: any) => (
                      <div key={item.showId} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-28 bg-muted rounded overflow-hidden">
                            <img
                              src={item.posterUrl || "/placeholder.svg?height=64&width=112"}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              {item.genre && <Badge variant="outline">{item.genre}</Badge>}
                              {item.year && <span className="text-xs text-muted-foreground">{item.year}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/shows/${item.showId}`)}>
                            Watch
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFromWatchlist(item.showId)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Watch History</CardTitle>
                <CardDescription>Shows and movies you've recently watched</CardDescription>
              </div>
              {watchHistory.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearWatchHistory}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear History
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {watchHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No watch history</h3>
                  <p className="text-muted-foreground mb-4">Your watch history will appear here</p>
                  <Button onClick={() => router.push("/shows")}>Browse Shows</Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {watchHistory.map((item: any) => (
                      <div key={item.showId} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-28 bg-muted rounded overflow-hidden">
                            <img
                              src={item.posterUrl || "/placeholder.svg?height=64&width=112"}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(item.lastWatched).toLocaleDateString()}
                              </div>
                              {item.progress && (
                                <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${item.progress * 100}%` }} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => router.push(`/shows/${item.showId}`)}>
                            Resume
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFromHistory(item.showId)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
