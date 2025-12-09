"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react"
import { BookForm } from "@/components/book-form"
import type { Book } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function BooksPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const { data: books, isLoading, mutate } = useSWR<Book[]>(`/api/books?search=${search}`, fetcher)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return

    await fetch(`/api/books?id=${id}`, { method: "DELETE" })
    mutate()
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    setEditingBook(null)
    mutate()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Books Management</h1>
          <p className="text-muted-foreground">Manage your library&apos;s book collection</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) setEditingBook(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
            </DialogHeader>
            <BookForm book={editingBook} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : books && books.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id?.toString()}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={book.availableQuantity > 0 ? "default" : "destructive"}>
                        {book.availableQuantity} / {book.quantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(book)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(book._id!.toString())}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books found. Add your first book!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
