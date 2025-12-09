import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const [totalPosts, totalAuthors, pendingComments, totalViews] = await Promise.all([
      db.collection("posts").countDocuments(),
      db.collection("authors").countDocuments(),
      db.collection("comments").countDocuments({ approved: false }),
      db.collection("posts").aggregate([
        { $group: { _id: null, total: { $sum: "$views" } } }
      ]).toArray().then(result => result[0]?.total || 0),
    ])

    const recentPosts = await db.collection("posts").find().sort({ createdAt: -1 }).limit(5).toArray()

    return NextResponse.json({
      totalPosts,
      totalAuthors,
      pendingComments,
      totalViews,
      recentPosts,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
