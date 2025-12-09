import type { ObjectId } from "mongodb"

export interface Book {
  _id?: ObjectId
  title: string
  author: string
  isbn: string
  category: string
  publishedYear: number
  quantity: number
  availableQuantity: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Member {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  address: string
  membershipDate: Date
  membershipType: "standard" | "premium"
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface BorrowRecord {
  _id?: ObjectId
  bookId: ObjectId
  memberId: ObjectId
  bookTitle: string
  memberName: string
  borrowDate: Date
  dueDate: Date
  returnDate?: Date
  status: "borrowed" | "returned" | "overdue"
  createdAt: Date
  updatedAt: Date
}
