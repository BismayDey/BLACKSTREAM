"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  X,
  Bell,
  Sun,
  Moon,
  Film,
  Tv,
  Home,
  Bookmark,
  LogOut,
  User,
  Settings,
  Heart,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { setTheme, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isVideoPage = pathname?.includes("/shows/");

      if (isVideoPage) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }
      } else {
        setHideNavbar(false);
      }

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showNotifications) {
        const target = e.target as HTMLElement;
        if (!target.closest(".notifications-container")) {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const notifications = [
    {
      id: 1,
      title: "New Episode Available",
      message: "Cosmic Odyssey S01E08 is now available to stream",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Continue Watching",
      message: "You left off at episode 3 of The Last Kingdom",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      title: "New Show Added",
      message: "Check out our latest addition: Urban Legends",
      time: "3 days ago",
      unread: false,
    },
  ];

  return (
    <AnimatePresence>
      {!hideNavbar && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            scrolled
              ? "bg-white/80 dark:bg-slate-900/80 navbar-blur border-b border-slate-200 dark:border-slate-800"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-initial">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                    >
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[280px] sm:w-[340px] p-0"
                  >
                    <div className="flex flex-col h-full">
                      <div className="p-4 sm:p-6 border-b">
                        <Link
                          href="/"
                          className="flex items-center gap-2 mb-4 sm:mb-6"
                        >
                          <span className="font-bold text-lg sm:text-xl gradient-text">
                            STREAMFLIX
                          </span>
                        </Link>
                        <form onSubmit={handleSearch} className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search..."
                            className="pl-8 h-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </form>
                      </div>
                      <div className="flex-1 overflow-auto py-4 sm:py-6 px-3 sm:px-4">
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3 px-2">
                              Menu
                            </h3>
                            <nav className="flex flex-col gap-1">
                              <Link
                                href="/"
                                className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors ${
                                  pathname === "/"
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                <Home className="h-4 w-4 flex-shrink-0" />
                                <span>Home</span>
                              </Link>
                              <Link
                                href="/shows"
                                className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors ${
                                  pathname?.startsWith("/shows")
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                <Tv className="h-4 w-4 flex-shrink-0" />
                                <span>TV Shows</span>
                              </Link>
                              <Link
                                href="/movies"
                                className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors ${
                                  pathname?.startsWith("/movies")
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                <Film className="h-4 w-4 flex-shrink-0" />
                                <span>Movies</span>
                              </Link>
                              <Link
                                href="/watchlist"
                                className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors ${
                                  pathname?.startsWith("/watchlist")
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                <Bookmark className="h-4 w-4 flex-shrink-0" />
                                <span>My List</span>
                              </Link>
                              <Link
                                href="/favorites"
                                className={`flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors ${
                                  pathname?.startsWith("/favorites")
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted"
                                }`}
                              >
                                <Heart className="h-4 w-4 flex-shrink-0" />
                                <span>Favorites</span>
                              </Link>
                            </nav>
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3 px-2">
                              Categories
                            </h3>
                            <div className="flex flex-wrap gap-2 px-2">
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Action
                              </Badge>
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Comedy
                              </Badge>
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Drama
                              </Badge>
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Sci-Fi
                              </Badge>
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Horror
                              </Badge>
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 hover:text-primary text-xs"
                              >
                                Documentary
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t p-3 sm:p-4">
                        {user ? (
                          <div className="flex items-center gap-3 sm:gap-4">
                            <Avatar className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                              <AvatarImage src={user.photoURL || ""} />
                              <AvatarFallback className="text-xs">
                                {user.displayName?.charAt(0) ||
                                  user.email?.charAt(0) ||
                                  "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium truncate">
                                {user.displayName || user.email}
                              </p>
                              <button
                                onClick={handleLogout}
                                className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                              >
                                <LogOut className="h-3 w-3 flex-shrink-0" />{" "}
                                Sign Out
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full text-xs sm:text-sm h-8 sm:h-9"
                            >
                              <Link href="/login">Sign In</Link>
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              className="w-full text-xs sm:text-sm h-8 sm:h-9"
                            >
                              <Link href="/register">Sign Up</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Link href="/" className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-base sm:text-lg lg:text-xl gradient-text whitespace-nowrap truncate">
                    STREAMFLIX
                  </span>
                </Link>

                <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm ml-4 xl:ml-6 flex-shrink-0">
                  <Link
                    href="/"
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                      pathname === "/" ? "text-primary" : "text-foreground/60"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden xl:inline">Home</span>
                  </Link>
                  <Link
                    href="/shows"
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                      pathname?.startsWith("/shows")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    <Tv className="w-4 h-4" />
                    <span className="hidden xl:inline">TV Shows</span>
                  </Link>
                  <Link
                    href="/movies"
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                      pathname?.startsWith("/movies")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    <Film className="w-4 h-4" />
                    <span className="hidden xl:inline">Movies</span>
                  </Link>
                  <Link
                    href="/watchlist"
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                      pathname?.startsWith("/watchlist")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span className="hidden xl:inline">My List</span>
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className="hidden sm:block">
                  {showSearch ? (
                    <form
                      onSubmit={handleSearch}
                      className="flex items-center bg-muted rounded-full overflow-hidden pl-3"
                    >
                      <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-[160px] md:w-[200px] lg:w-[240px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 flex-shrink-0"
                        onClick={() => setShowSearch(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden h-9 w-9 flex-shrink-0"
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                >
                  {isMobileSearchOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="sr-only">Search</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                    >
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {user && (
                  <div className="relative notifications-container flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                      {notifications.some((n) => n.unread) && (
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full" />
                      )}
                    </Button>

                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-popover rounded-md shadow-lg overflow-hidden z-50 border"
                        >
                          <div className="p-3 border-b">
                            <h3 className="font-medium text-sm">
                              Notifications
                            </h3>
                          </div>
                          <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-3 border-b last:border-0 hover:bg-muted/50 transition-colors ${
                                  notification.unread ? "bg-primary/5" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start mb-1 gap-2">
                                  <h4 className="font-medium text-sm flex-1">
                                    {notification.title}
                                  </h4>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 border-t text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-primary text-xs"
                            >
                              View All Notifications
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                      >
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                          <AvatarImage src={user.photoURL || ""} />
                          <AvatarFallback className="text-xs">
                            {user.displayName?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 sm:w-56">
                      <DropdownMenuLabel className="text-xs sm:text-sm">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="text-xs sm:text-sm"
                      >
                        <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/profile/subscriptions")}
                        className="text-xs sm:text-sm"
                      >
                        <Tv className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Subscriptions
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/profile/history")}
                        className="text-xs sm:text-sm"
                      >
                        <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Watch History
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/profile/settings")}
                        className="text-xs sm:text-sm"
                      >
                        <Settings className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-xs sm:text-sm"
                      >
                        <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    >
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isMobileSearchOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="sm:hidden overflow-hidden"
                >
                  <form onSubmit={handleSearch} className="pb-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search movies, shows..."
                        className="pl-9 pr-4 h-9 w-full bg-muted"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
