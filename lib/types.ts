import type { ObjectId } from "mongodb"

export interface Post {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author: string
  coverImage?: string
  tags: string[]
  published: boolean
  views: number
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
  postId: ObjectId
  postTitle: string
  authorName: string
  authorEmail: string
  content: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
}
