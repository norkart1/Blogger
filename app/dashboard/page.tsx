"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, MessageSquare, TrendingUp, Loader2 } from "lucide-react"
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
      title: "Total Posts",
      value: stats?.totalPosts || 0,
      icon: FileText,
      color: "bg-chart-1",
    },
    {
      title: "Total Authors",
      value: stats?.totalAuthors || 0,
      icon: Users,
      color: "bg-chart-2",
    },
    {
      title: "Total Comments",
      value: stats?.totalComments || 0,
      icon: MessageSquare,
      color: "bg-chart-3",
    },
    {
      title: "Published Posts",
      value: stats?.publishedPosts || 0,
      icon: TrendingUp,
      color: "bg-chart-4",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening on your blog.</p>
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
          <CardTitle>Recent Comments</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentComments && stats.recentComments.length > 0 ? (
            <div className="space-y-4">
              {stats.recentComments.map(
                (comment: {
                  _id: string
                  authorName: string
                  postTitle: string
                  status: string
                  createdAt: string
                }) => (
                  <div
                    key={comment._id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{comment.authorName}</p>
                      <p className="text-sm text-muted-foreground">
                        Commented on &quot;{comment.postTitle}&quot;
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No recent comments. Start by adding posts and authors!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
