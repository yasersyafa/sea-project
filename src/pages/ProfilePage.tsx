import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, CreditCard, UtensilsCrossed, LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileSkeleton } from "@/partials/ProfileSkeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/useAuth"
import { useSubscription } from "@/hooks/useSubscription"
import { Link } from "react-router"

export default function ProfilePage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { logout, getUser } = useAuth()
  const { useSubscriptionQuery } = useSubscription()

  const { data, isLoading, isError } = useSubscriptionQuery()

  const user = getUser()
  const handleLogout = () => {
    setShowLogoutDialog(false)
    logout()
  }

  if(isLoading || isError) {
    return <ProfileSkeleton />
  }

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
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Name</label>
            </div>
            <p className="text-lg">{user!.name}</p>
          </div>

          <Separator />

          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Phone</label>
            </div>
            <p className="text-lg">{user!.telephone}</p>
          </div>

          <Separator />

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Email</label>
            </div>
            <p className="text-lg">{user!.email}</p>
          </div>

          <Separator />
          {/* Subscription Plan */}

          {data!.length > 0 ? data!.map((sub) => (
            <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Subscription Plan</label>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg uppercase">{sub.plan} Plan</h3>
                  <p className="text-sm text-muted-foreground">Here is your subscription plan</p>
                </div>
                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Plan Name:</span>
                  <p className="text-muted-foreground">{sub.plan} plan</p>
                </div>
                <div>
                  <span className="font-medium">Total Price:</span>
                  <p className="text-muted-foreground">Rp. {Number(sub.price).toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <span className="font-medium">Meal Types:</span>
                  <p className="text-muted-foreground">{sub.mealTypes.join(', ')}</p>
                </div>
                <div>
                  <span className="font-medium">Delivery Days:</span>
                  <p className="text-muted-foreground">{sub.deliveryDays.join(', ')}</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Allergies Note:</span>
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">⚠️ Contains: {sub?.allergies}</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Please review each meal carefully. Contact support if you have severe allergies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          ))
          : (
            // No Subscription
            <div className="bg-muted/30 rounded-lg p-6 text-center space-y-4 border-2 border-dashed border-muted-foreground/30">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">No Active Subscription</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    You don't have an active meal subscription plan. Subscribe now to start enjoying fresh, delicious
                    meals delivered to your door.
                  </p>
                </div>
                <Link to={'/subscription'}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Subscribe to a Plan
                    </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Choose from our variety of meal plans starting at Rp. 30.000/meal
                </p>
            </div>
          )}
          

          <Separator />

          {/* Selected Menu */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Selected Menu</label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span>Grilled Salmon with Vegetables</span>
                <Badge variant="outline">Main Course</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span>Caesar Salad</span>
                <Badge variant="outline">Appetizer</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span>Chocolate Lava Cake</span>
                <Badge variant="outline">Dessert</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logout Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
