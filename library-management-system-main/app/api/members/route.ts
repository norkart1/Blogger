import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { Member } from "@/lib/types"
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
        { phone: { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.status = status
    }

    const members = await db.collection<Member>("members").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const member: Omit<Member, "_id"> = {
      ...body,
      membershipDate: new Date(),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Member>("members").insertOne(member as Member)

    return NextResponse.json({ ...member, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating member:", error)
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...updateData } = body

    const result = await db
      .collection<Member>("members")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { ...updateData, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating member:", error)
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Member ID required" }, { status: 400 })
    }

    const result = await db.collection<Member>("members").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting member:", error)
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 })
  }
}
