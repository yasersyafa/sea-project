import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, CreditCard, UtensilsCrossed } from "lucide-react"

export function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Name</label>
            </div>
            <Skeleton className="h-7 w-48" />
          </div>

          <Separator />

          {/* Phone Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Phone</label>
            </div>
            <Skeleton className="h-7 w-40" />
          </div>

          <Separator />

          {/* Email Skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Email</label>
            </div>
            <Skeleton className="h-7 w-64" />
          </div>

          <Separator />

          {/* Subscription Plan Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Subscription Plan</label>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-22" />
                  <Skeleton className="h-4 w-44" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-52" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Selected Menu Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Selected Menu</label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-18 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Logout Button Skeleton */}
          <div className="pt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
