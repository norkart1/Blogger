import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { Member } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, address, membershipType } = body

    if (!name || !email || !phone || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingMember = await db.collection<Member>("members").findOne({ email })
    if (existingMember) {
      return NextResponse.json({ error: "A member with this email already exists" }, { status: 400 })
    }

    // Create new member with pending status
    const member: Omit<Member, "_id"> = {
      name,
      email,
      phone,
      address,
      membershipType: membershipType || "standard",
      membershipDate: new Date(),
      status: "inactive", // Will be activated by admin
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Member>("members").insertOne(member as Member)

    return NextResponse.json(
      {
        success: true,
        message: "Membership application submitted successfully",
        memberId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating membership:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
