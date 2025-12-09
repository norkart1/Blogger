"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, ArrowLeftRight, AlertTriangle, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DashboardPage() {
  const { data: stats, isLoading } = useSWR("/api/stats", fetcher, {
    refreshInterval: 30000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Books",
      value: stats?.totalBooks || 0,
      icon: BookOpen,
      color: "bg-chart-1",
    },
    {
      title: "Total Members",
      value: stats?.totalMembers || 0,
      icon: Users,
      color: "bg-chart-2",
    },
    {
      title: "Active Borrowings",
      value: stats?.activeBorrowings || 0,
      icon: ArrowLeftRight,
      color: "bg-chart-3",
    },
    {
      title: "Overdue",
      value: stats?.overdueCount || 0,
      icon: AlertTriangle,
      color: "bg-chart-5",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening in your library.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentBorrowings && stats.recentBorrowings.length > 0 ? (
            <div className="space-y-4">
              {stats.recentBorrowings.map(
                (record: {
                  _id: string
                  memberName: string
                  bookTitle: string
                  status: string
                  createdAt: string
                }) => (
                  <div
                    key={record._id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{record.memberName}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.status === "borrowed" ? "Borrowed" : "Returned"} &quot;{record.bookTitle}&quot;
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(record.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No recent activity. Start by adding books and members!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
