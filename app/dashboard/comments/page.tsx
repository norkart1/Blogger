"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, Check, X } from "lucide-react"
import { format } from "date-fns"
import type { Comment } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CommentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<Comment[]>(`/api/comments?search=${search}&status=${statusFilter}`, fetcher)

  const handleApprove = async (comment: Comment) => {
    await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: comment._id,
        status: "approved",
      }),
    })
    mutate()
  }

  const handleReject = async (comment: Comment) => {
    if (!confirm("Are you sure you want to reject this comment?")) return

    await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: comment._id,
        status: "rejected",
      }),
    })
    mutate()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    await fetch(`/api/comments?id=${id}`, { method: "DELETE" })
    mutate()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comments Management</h1>
          <p className="text-muted-foreground">Moderate and manage blog comments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comments..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : comments && comments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Post</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment._id?.toString()}>
                    <TableCell className="font-medium">{comment.authorName}</TableCell>
                    <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                    <TableCell>{comment.postTitle || "Unknown"}</TableCell>
                    <TableCell>{format(new Date(comment.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>{getStatusBadge(comment.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {comment.status === "pending" && (
                          <>
                            <Button variant="outline" size="icon" onClick={() => handleApprove(comment)}>
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleReject(comment)}>
                              <X className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(comment._id!.toString())}>
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No comments found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
