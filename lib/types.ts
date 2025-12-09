import type { ObjectId } from "mongodb"

export interface Post {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  authorName?: string
  category: string
  tags: string[]
  status: "draft" | "published" | "archived"
  imageUrl?: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Author {
  _id?: ObjectId
  name: string
  email: string
  bio: string
  avatar?: string
  role: "admin" | "author"
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  _id?: ObjectId
  postId: ObjectId | string
  postTitle?: string
  authorName: string
  authorEmail: string
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}
