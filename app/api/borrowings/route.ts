import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import type { BorrowRecord, Book } from "@/lib/types"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || ""
    const search = searchParams.get("search") || ""

    const query: Record<string, unknown> = {}

    if (status) {
      query.status = status
    }

    if (search) {
      query.$or = [{ bookTitle: { $regex: search, $options: "i" } }, { memberName: { $regex: search, $options: "i" } }]
    }

    const borrowings = await db.collection<BorrowRecord>("borrowings").find(query).sort({ createdAt: -1 }).toArray()

    // Update overdue status
    const now = new Date()
    const updatedBorrowings = borrowings.map((b) => {
      if (b.status === "borrowed" && new Date(b.dueDate) < now) {
        return { ...b, status: "overdue" as const }
      }
      return b
    })

    return NextResponse.json(updatedBorrowings)
  } catch (error) {
    console.error("Error fetching borrowings:", error)
    return NextResponse.json({ error: "Failed to fetch borrowings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    // Check book availability
    const book = await db.collection<Book>("books").findOne({ _id: new ObjectId(body.bookId) })

    if (!book || book.availableQuantity <= 0) {
      return NextResponse.json({ error: "Book not available" }, { status: 400 })
    }

    const borrowRecord: Omit<BorrowRecord, "_id"> = {
      bookId: new ObjectId(body.bookId),
      memberId: new ObjectId(body.memberId),
      bookTitle: body.bookTitle,
      memberName: body.memberName,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      status: "borrowed",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Decrease available quantity
    await db
      .collection<Book>("books")
      .updateOne({ _id: new ObjectId(body.bookId) }, { $inc: { availableQuantity: -1 } })

    const result = await db.collection<BorrowRecord>("borrowings").insertOne(borrowRecord as BorrowRecord)

    return NextResponse.json({ ...borrowRecord, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating borrowing:", error)
    return NextResponse.json({ error: "Failed to create borrowing" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, action, bookId } = body

    if (action === "return") {
      // Update borrowing record
      await db.collection<BorrowRecord>("borrowings").updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            status: "returned",
            returnDate: new Date(),
            updatedAt: new Date(),
          },
        },
      )

      // Increase available quantity
      await db.collection<Book>("books").updateOne({ _id: new ObjectId(bookId) }, { $inc: { availableQuantity: 1 } })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating borrowing:", error)
    return NextResponse.json({ error: "Failed to update borrowing" }, { status: 500 })
  }
}
