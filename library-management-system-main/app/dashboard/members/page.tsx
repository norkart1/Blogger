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
import { MemberForm } from "@/components/member-form"
import { format } from "date-fns"
import type { Member } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function MembersPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  const { data: members, isLoading, mutate } = useSWR<Member[]>(`/api/members?search=${search}`, fetcher)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return

    await fetch(`/api/members?id=${id}`, { method: "DELETE" })
    mutate()
  }

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setDialogOpen(false)
    setEditingMember(null)
    mutate()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Members Management</h1>
          <p className="text-muted-foreground">Manage library members and their memberships</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) setEditingMember(null)
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Member" : "Add New Member"}</DialogTitle>
            </DialogHeader>
            <MemberForm member={editingMember} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
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
          ) : members && members.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id?.toString()}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      <Badge variant={member.membershipType === "premium" ? "default" : "secondary"}>
                        {member.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(member.membershipDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant={member.status === "active" ? "default" : "destructive"}>{member.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(member._id!.toString())}>
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
              <p className="text-muted-foreground">No members found. Add your first member!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
