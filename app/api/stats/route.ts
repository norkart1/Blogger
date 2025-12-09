import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const [totalBooks, totalMembers, activeBorrowings, overdueCount] = await Promise.all([
      db.collection("books").countDocuments(),
      db.collection("members").countDocuments(),
      db.collection("borrowings").countDocuments({ status: "borrowed" }),
      db.collection("borrowings").countDocuments({
        status: "borrowed",
        dueDate: { $lt: new Date() },
      }),
    ])

    // Get recent activities
    const recentBorrowings = await db.collection("borrowings").find().sort({ createdAt: -1 }).limit(5).toArray()

    return NextResponse.json({
      totalBooks,
      totalMembers,
      activeBorrowings,
      overdueCount,
      recentBorrowings,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
