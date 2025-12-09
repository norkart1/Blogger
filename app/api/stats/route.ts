import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const [totalPosts, publishedPosts, totalAuthors, totalComments, pendingComments] = await Promise.all([
      db.collection("posts").countDocuments(),
      db.collection("posts").countDocuments({ status: "published" }),
      db.collection("authors").countDocuments(),
      db.collection("comments").countDocuments(),
      db.collection("comments").countDocuments({ status: "pending" }),
    ])

    const recentComments = await db.collection("comments").find().sort({ createdAt: -1 }).limit(5).toArray()

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      totalAuthors,
      totalComments,
      pendingComments,
      recentComments,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
