import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { Post } from "@/lib/types"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const status = searchParams.get("status") || ""

    const query: Record<string, unknown> = {}

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ]
    }

    if (category && category !== "all") {
      query.category = category
    }

    if (status && status !== "all") {
      query.status = status
    }

    const posts = await db.collection<Post>("posts").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const now = new Date()
    const post: Omit<Post, "_id"> = {
      title: body.title,
      slug,
      content: body.content || "",
      excerpt: body.excerpt || "",
      authorId: body.authorId || "",
      authorName: body.authorName || "",
      category: body.category || "Other",
      tags: body.tags || [],
      status: body.status || "draft",
      publishedAt: body.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection<Post>("posts").insertOne(post as Post)

    return NextResponse.json({ ...post, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...updateData } = body

    if (updateData.status === "published" && !updateData.publishedAt) {
      updateData.publishedAt = new Date()
    }

    const result = await db
      .collection<Post>("posts")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { ...updateData, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 })
    }

    const result = await db.collection<Post>("posts").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
