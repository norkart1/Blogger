"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Loader2, RotateCcw } from "lucide-react"
import { BorrowingForm } from "@/components/borrowing-form"
import { format } from "date-fns"
import type { BorrowRecord } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function BorrowingsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    data: borrowings,
    isLoading,
    mutate,
  } = useSWR<BorrowRecord[]>(`/api/borrowings?search=${search}&status=${statusFilter}`, fetcher)

  const handleReturn = async (borrowing: BorrowRecord) => {
    if (!confirm("Mark this book as returned?")) return

    await fetch("/api/borrowings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: borrowing._id,
        bookId: borrowing.bookId,
        action: "return",
      }),
    })
    mutate()
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    mutate()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "borrowed":
        return <Badge variant="default">Borrowed</Badge>
      case "returned":
        return <Badge variant="secondary">Returned</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Borrowings Management</h1>
          <p className="text-muted-foreground">Track book borrowings and returns</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Borrowing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Issue Book</DialogTitle>
            </DialogHeader>
            <BorrowingForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by book or member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : borrowings && borrowings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowings.map((borrowing) => (
                  <TableRow key={borrowing._id?.toString()}>
                    <TableCell className="font-medium">{borrowing.bookTitle}</TableCell>
                    <TableCell>{borrowing.memberName}</TableCell>
                    <TableCell>{format(new Date(borrowing.borrowDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(new Date(borrowing.dueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {borrowing.returnDate ? format(new Date(borrowing.returnDate), "MMM d, yyyy") : "-"}
                    </TableCell>
                    <TableCell>{getStatusBadge(borrowing.status)}</TableCell>
                    <TableCell className="text-right">
                      {borrowing.status !== "returned" && (
                        <Button variant="outline" size="sm" onClick={() => handleReturn(borrowing)}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Return
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No borrowings found. Issue a book to a member!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
