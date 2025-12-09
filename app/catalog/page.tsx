"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PenLine, Search, Filter, ArrowLeft, Clock, Bookmark, Home, Compass, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Post {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  authorName?: string
  category: string
  tags: string[]
  imageUrl?: string
  status: "draft" | "published" | "archived"
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Entertainment",
  "Science",
  "Sports",
  "Other",
]

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    fetchPosts()
  }, [searchTerm, selectedCategory])

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
      params.set("status", "published")

      const response = await fetch(`/api/posts?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
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
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <PenLine className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">Scribblr</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Discover Articles</h1>
          <p className="mt-1 text-muted-foreground">Explore our collection of stories and insights</p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full rounded-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {loading ? "Loading..." : `${posts.length} article${posts.length !== 1 ? "s" : ""} found`}
        </p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-card p-3 shadow-sm">
                <div className="mb-3 h-40 rounded-xl bg-muted"></div>
                <div className="h-4 w-3/4 rounded bg-muted"></div>
                <div className="mt-2 h-3 w-1/2 rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl bg-card p-12 text-center shadow-sm">
            <PenLine className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No articles found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <div key={post._id} className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-md">
                <div className="relative h-44 overflow-hidden">
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
                  <div className="absolute bottom-2 left-2">
                    <Badge className="rounded-full bg-white/90 text-foreground hover:bg-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  )}
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
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-md items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/catalog" className="flex flex-col items-center gap-1 p-2 text-primary">
            <Compass className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
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
