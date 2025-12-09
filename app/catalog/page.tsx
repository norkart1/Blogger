"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Search, Filter, ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

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
            <Link href="/membership">
              <Button variant="ghost">Subscribe</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="mt-2 text-muted-foreground">Explore our collection of articles and stories</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Categories" />
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

        {/* Results Count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {loading ? "Loading..." : `${posts.length} post${posts.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 w-3/4 rounded bg-muted"></div>
                  <div className="h-4 w-1/2 rounded bg-muted"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full rounded bg-muted"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No posts found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post._id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span className="line-clamp-1">{post.authorName || "Unknown Author"}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    {post.excerpt && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
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
