"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PenLine, Bookmark, Bell, Home, Compass, User, Plus, ChevronRight, Clock } from "lucide-react"
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
    <div className="min-h-screen bg-[#F2F2F7]">
      <header className="sticky top-0 z-50 bg-[#F2F2F7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Al Jawahir"
              width={200}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <Bell className="h-7 w-7" strokeWidth={1.5} />
            </button>
            <Link href="/catalog">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <Bookmark className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-24 pt-2">
        <div className="mb-6 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] shadow-sm">
          <div className="flex items-center">
            <div className="flex-1 p-5">
              <h2 className="mb-3 text-[17px] font-semibold leading-tight text-white">Learn how to become a great writer right now!</h2>
              <Link href="/membership">
                <Button 
                  className="h-9 rounded-full bg-white px-5 text-[14px] font-medium text-[#FF6B35] shadow-sm hover:bg-white/90"
                >
                  Read more
                </Button>
              </Link>
            </div>
            <div className="relative h-32 w-28 flex-shrink-0">
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

        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-gray-900">Recent Articles</h2>
            <Link href="/catalog" className="flex items-center gap-0.5 text-[15px] font-medium text-[#007AFF]">
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white p-3">
                  <div className="flex gap-3">
                    <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-gray-200"></div>
                    <div className="flex-1 py-1">
                      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="mt-2 h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <PenLine className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold text-gray-900">No articles yet</h3>
              <p className="mt-1 text-[15px] text-gray-500">Check back soon for new content!</p>
              <Link href="/login">
                <Button className="mt-4 h-11 rounded-full bg-[#007AFF] px-6 text-[15px] font-medium hover:bg-[#0066CC]">
                  Create your first article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.slice(0, 4).map((post, index) => (
                <Link key={post._id} href="/catalog" className="block">
                  <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm transition-all active:scale-[0.98]">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={post.imageUrl || getCategoryImage(post.category, index)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-0.5">
                      <h3 className="line-clamp-2 text-[15px] font-semibold leading-tight text-gray-900">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-gray-100 text-[10px] font-medium text-gray-600">
                            {getInitials(post.authorName || "Author")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[13px] text-gray-500">{post.authorName || "Unknown"}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1 text-[12px] text-gray-400">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="my-auto h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {recentPosts.length > 4 && (
          <section className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-gray-900">More Articles</h2>
            </div>
            <div className="space-y-3">
              {recentPosts.slice(4, 6).map((post, index) => (
                <Link key={post._id} href="/catalog" className="block">
                  <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm transition-all active:scale-[0.98]">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={post.imageUrl || getCategoryImage(post.category, index + 4)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-0.5">
                      <h3 className="line-clamp-2 text-[15px] font-semibold leading-tight text-gray-900">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-gray-100 text-[10px] font-medium text-gray-600">
                            {getInitials(post.authorName || "Author")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[13px] text-gray-500">{post.authorName || "Unknown"}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="my-auto h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-[20px] font-bold text-gray-900">Join Our Community</h2>
            <p className="mt-1 text-[15px] text-gray-500">Get the latest articles delivered to your inbox</p>
            <Link href="/membership">
              <Button className="mt-4 h-11 rounded-full bg-[#007AFF] px-8 text-[15px] font-medium hover:bg-[#0066CC]">
                Subscribe Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200/80 bg-[#F2F2F7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-around pb-6 pt-2">
          <Link href="/" className="flex flex-col items-center gap-0.5 px-4 py-1">
            <Home className="h-6 w-6 text-[#007AFF]" />
            <span className="text-[10px] font-medium text-[#007AFF]">Home</span>
          </Link>
          <Link href="/catalog" className="flex flex-col items-center gap-0.5 px-4 py-1">
            <Compass className="h-6 w-6 text-gray-400" />
            <span className="text-[10px] text-gray-400">Discover</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center px-4 py-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#007AFF] shadow-lg shadow-blue-500/30">
              <Plus className="h-6 w-6 text-white" />
            </div>
          </Link>
          <Link href="/catalog" className="flex flex-col items-center gap-0.5 px-4 py-1">
            <PenLine className="h-6 w-6 text-gray-400" />
            <span className="text-[10px] text-gray-400">Articles</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center gap-0.5 px-4 py-1">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-[10px] text-gray-400">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
