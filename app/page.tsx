import Link from "next/link"
import { BookOpen, Users, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">LibraryHub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/catalog">
              <Button variant="ghost">Browse Catalog</Button>
            </Link>
            <Link href="/membership">
              <Button variant="ghost">Join Library</Button>
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
            Discover Your Next Great Read
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Explore thousands of books across all genres. Search our collection, reserve titles, and become a member
            today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/catalog">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Search Books
              </Button>
            </Link>
            <Link href="/membership">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Users className="h-5 w-5" />
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Join Our Library?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Vast Collection</h3>
              <p className="text-muted-foreground">
                Access thousands of books across fiction, non-fiction, science, history, and more.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Flexible Borrowing</h3>
              <p className="text-muted-foreground">
                Borrow books for up to 14 days with easy renewal options for members.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Community Events</h3>
              <p className="text-muted-foreground">
                Join book clubs, author readings, and educational workshops throughout the year.
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
            Join our library today and get instant access to our entire catalog. Membership is quick and easy.
          </p>
          <Link href="/membership">
            <Button size="lg">Apply for Membership</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">LibraryHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LibraryHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
