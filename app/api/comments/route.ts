import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { Comment } from "@/lib/types"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const approved = searchParams.get("approved")
    const search = searchParams.get("search") || ""
    const postId = searchParams.get("postId")

    const query: Record<string, unknown> = {}

    if (approved === "true") {
      query.approved = true
    } else if (approved === "false") {
      query.approved = false
    }

    if (postId) {
      query.postId = new ObjectId(postId)
    }

    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    const comments = await db.collection<Comment>("comments").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const comment: Omit<Comment, "_id"> = {
      postId: new ObjectId(body.postId),
      postTitle: body.postTitle,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      content: body.content,
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Comment>("comments").insertOne(comment as Comment)

    return NextResponse.json({ ...comment, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, action } = body

    if (action === "approve") {
      await db.collection<Comment>("comments").updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            approved: true,
            updatedAt: new Date(),
          },
        },
      )
      return NextResponse.json({ success: true })
    }

    if (action === "reject") {
      await db.collection<Comment>("comments").updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            approved: false,
            updatedAt: new Date(),
          },
        },
      )
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating comment:", error)
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Comment ID required" }, { status: 400 })
    }

    const result = await db.collection<Comment>("comments").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
  }
}
