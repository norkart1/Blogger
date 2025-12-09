"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PenLine, Bookmark, Bell, Search, Home, Compass, User, Plus, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  authorName?: string
  category: string
  imageUrl?: string
  publishedAt?: Date
  createdAt: Date
}

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts?status=published")
      if (response.ok) {
        const data = await response.json()
        setRecentPosts(data.slice(0, 6))
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getCategoryImage = (category: string, index: number) => {
    const images: Record<string, string[]> = {
      "Technology": [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
      ],
      "Travel": [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop"
      ],
      "Lifestyle": [
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      ],
      "Business": [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
      ],
      "Health": [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      ],
      "Food": [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop"
      ],
    }
    const categoryImages = images[category] || [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=300&fit=crop"
    ]
    return categoryImages[index % categoryImages.length]
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center relative">
            <Image
              src="/logo.png"
              alt="Al Jawahir"
              width={180}
              height={50}
              className="h-10 w-auto object-contain sm:h-12"
              priority
            />
            <span className="absolute bottom-[5px] right-[58px] h-1.5 w-1.5 rounded-full bg-red-500 sm:bottom-[6px] sm:right-[70px] sm:h-2 sm:w-2" style={{ animation: 'blink 1s infinite' }}></span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/catalog">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bookmark className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent/70 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 p-6 text-primary-foreground md:py-8 md:pl-8">
              <h2 className="mb-3 text-lg font-bold leading-snug md:text-2xl">Learn how to become a great writer right now!</h2>
              <Link href="/membership">
                <Button 
                  variant="secondary" 
                  className="rounded-full border-2 border-white/30 bg-white/95 px-6 text-primary hover:bg-white"
                >
                  Read more
                </Button>
              </Link>
            </div>
            <div className="relative h-40 w-32 flex-shrink-0 md:h-48 md:w-48">
              <Image
                src="/banner-woman.jpg"
                alt="Woman with books"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Articles</h2>
            <Link href="/catalog" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-card p-3 shadow-sm">
                  <div className="mb-3 h-40 rounded-xl bg-muted"></div>
                  <div className="h-4 w-3/4 rounded bg-muted"></div>
                  <div className="mt-2 h-3 w-1/2 rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="rounded-2xl bg-card p-8 text-center shadow-sm">
              <PenLine className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No articles yet</h3>
              <p className="mt-2 text-muted-foreground">Check back soon for new content!</p>
              <Link href="/login">
                <Button className="mt-4 rounded-full" variant="default">
                  Create your first article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.slice(0, 3).map((post, index) => (
                <Link key={post._id} href="/catalog" className="group">
                  <div className="overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={post.imageUrl || getCategoryImage(post.category, index)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute right-2 top-2">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary">
                        {post.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {getInitials(post.authorName || "Author")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.authorName || "Unknown"}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {recentPosts.length > 3 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">More Articles</h2>
              <Link href="/catalog" className="flex items-center gap-1 text-sm text-primary hover:underline">
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.slice(3, 6).map((post, index) => (
                <Link key={post._id} href="/catalog" className="group">
                  <div className="overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-md">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={post.imageUrl || getCategoryImage(post.category, index + 3)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute right-2 top-2">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary">
                        {post.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {getInitials(post.authorName || "Author")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.authorName || "Unknown"}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-24 overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-muted p-6">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Join Our Community</h2>
            <p className="mb-4 text-muted-foreground">Get the latest articles delivered to your inbox</p>
            <Link href="/membership">
              <Button className="rounded-full px-6">
                Subscribe Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-md items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 p-2 text-primary">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/catalog" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground">
            <Compass className="h-5 w-5" />
            <span className="text-xs">Discover</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center gap-1 p-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Plus className="h-6 w-6" />
            </div>
          </Link>
          <Link href="/catalog" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground">
            <PenLine className="h-5 w-5" />
            <span className="text-xs">Articles</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
