import Link from "next/link"
import { FileText, Users, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <Link href="/membership">
              <Button variant="ghost">Subscribe</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Discover Stories That Inspire
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Explore insightful articles from talented writers across all topics. Read, comment, and become part of
            our community today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/catalog">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Browse Posts
              </Button>
            </Link>
            <Link href="/membership">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Users className="h-5 w-5" />
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Read BlogHub?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Quality Content</h3>
              <p className="text-muted-foreground">
                Access hundreds of articles across technology, lifestyle, business, and more.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Fresh Perspectives</h3>
              <p className="text-muted-foreground">
                New posts published regularly from diverse voices and expert contributors.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Engaged Community</h3>
              <p className="text-muted-foreground">
                Join discussions, leave comments, and connect with like-minded readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Start Reading?</h2>
          <p className="mb-8 text-muted-foreground">
            Subscribe today and never miss a new post. Get the latest articles delivered straight to you.
          </p>
          <Link href="/membership">
            <Button size="lg">Subscribe Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8">
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
