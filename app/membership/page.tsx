"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FileText, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipType: "free" as "free" | "premium",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to subscribe")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BlogHub</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground">Subscribed Successfully!</h1>
          <p className="mb-8 text-muted-foreground">
            Thank you for subscribing to BlogHub. You will receive our latest articles and updates in your inbox.
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link href="/catalog">
              <Button>Browse Posts</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">BlogHub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/catalog">
              <Button variant="ghost">Browse Posts</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Subscribe to BlogHub</h1>
          <p className="mt-2 text-muted-foreground">Stay updated with our latest articles and exclusive content</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Free Subscription</CardTitle>
              <CardDescription>Free Forever</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Weekly newsletter
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Access to all public posts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Comment on articles
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Premium Subscription</CardTitle>
              <CardDescription>$5/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  All free features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Exclusive premium content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Early access to new posts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Ad-free experience
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>Enter your details to subscribe</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Subscription Type *</Label>
                <RadioGroup
                  value={formData.membershipType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, membershipType: value as "free" | "premium" })
                  }
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="font-normal">
                      Free Subscription
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="font-normal">
                      Premium Subscription ($5/month)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-auto border-t border-border bg-card px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">BlogHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
