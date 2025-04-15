"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // If auth is not available yet, show a loading state
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we set up subscription options</p>
        </div>
      </div>
    )
  }

  const { user, updateUserData } = auth

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$8.99",
      period: "month",
      features: ["HD streaming", "Watch on 1 device at a time", "Unlimited movies and TV shows", "Cancel anytime"],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$13.99",
      period: "month",
      features: [
        "Full HD streaming",
        "Watch on 2 devices at a time",
        "Unlimited movies and TV shows",
        "Downloads available",
        "Cancel anytime",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$17.99",
      period: "month",
      features: [
        "Ultra HD and HDR streaming",
        "Watch on 4 devices at a time",
        "Unlimited movies and TV shows",
        "Downloads available",
        "Priority customer support",
        "Cancel anytime",
      ],
    },
  ]

  const handleSubscribe = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)

    try {
      // In a real app, this would connect to a payment processor
      // For demo purposes, we'll just update the user's subscription in Firestore
      await updateUserData({
        subscription: {
          plan: selectedPlan,
          status: "active",
          startDate: new Date().toISOString(),
        },
      })

      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${selectedPlan} plan.`,
      })

      router.push("/profile")
    } catch (error) {
      console.error("Error subscribing:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">Upgrade your experience with premium features and content</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? "border-primary" : ""} ${
              selectedPlan === plan.id ? "ring-2 ring-primary" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" disabled={!selectedPlan || isProcessing} onClick={handleSubscribe} className="px-8">
          {isProcessing ? "Processing..." : "Subscribe Now"}
        </Button>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your
              billing period.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I change my plan?</h3>
            <p className="text-muted-foreground">
              You can change your plan at any time from your account settings. The new plan will take effect
              immediately.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
