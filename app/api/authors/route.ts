import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { Author } from "@/lib/types"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    const query: Record<string, unknown> = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.status = status
    }

    const authors = await db.collection<Author>("authors").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(authors)
  } catch (error) {
    console.error("Error fetching authors:", error)
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const author: Omit<Author, "_id"> = {
      name: body.name,
      email: body.email,
      bio: body.bio || "",
      avatar: body.avatar || "",
      role: body.role || "author",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Author>("authors").insertOne(author as Author)

    return NextResponse.json({ ...author, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating author:", error)
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...updateData } = body

    const result = await db
      .collection<Author>("authors")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { ...updateData, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating author:", error)
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Author ID required" }, { status: 400 })
    }

    const result = await db.collection<Author>("authors").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting author:", error)
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 })
  }
}
