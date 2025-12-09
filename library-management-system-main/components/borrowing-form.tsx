"use client"

import type React from "react"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Book, Member } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface BorrowingFormProps {
  onSuccess: () => void
}

export function BorrowingForm({ onSuccess }: BorrowingFormProps) {
  const [loading, setLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState("")
  const [selectedMember, setSelectedMember] = useState("")

  const { data: books } = useSWR<Book[]>("/api/books", fetcher)
  const { data: members } = useSWR<Member[]>("/api/members", fetcher)

  const availableBooks = books?.filter((b) => b.availableQuantity > 0) || []
  const activeMembers = members?.filter((m) => m.status === "active") || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const book = books?.find((b) => b._id?.toString() === selectedBook)
    const member = members?.find((m) => m._id?.toString() === selectedMember)

    if (!book || !member) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/borrowings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: selectedBook,
          memberId: selectedMember,
          bookTitle: book.title,
          memberName: member.name,
        }),
      })

      if (res.ok) {
        onSuccess()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="book">Select Book</Label>
        <Select value={selectedBook} onValueChange={setSelectedBook}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a book" />
          </SelectTrigger>
          <SelectContent>
            {availableBooks.length > 0 ? (
              availableBooks.map((book) => (
                <SelectItem key={book._id?.toString()} value={book._id!.toString()}>
                  {book.title} ({book.availableQuantity} available)
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No books available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="member">Select Member</Label>
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a member" />
          </SelectTrigger>
          <SelectContent>
            {activeMembers.length > 0 ? (
              activeMembers.map((member) => (
                <SelectItem key={member._id?.toString()} value={member._id!.toString()}>
                  {member.name} ({member.email})
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No active members
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm text-muted-foreground">Due date will be set to 14 days from today.</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading || !selectedBook || !selectedMember}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Issue Book"
          )}
        </Button>
      </div>
    </form>
  )
}
