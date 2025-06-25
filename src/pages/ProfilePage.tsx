import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, CreditCard, UtensilsCrossed, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/useAuth"

export default function ProfilePage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const { logout, getUser } = useAuth()

  const user = getUser()
  const handleLogout = () => {
    setShowLogoutDialog(false)
    logout()
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
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-600" />
              <label className="text-sm font-medium">Subscription Plan</label>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{}</h3>
                  <p className="text-sm text-muted-foreground">Full access to all features</p>
                </div>
                <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Price:</span>
                  <p className="text-muted-foreground">$29.99/month</p>
                </div>
                <div>
                  <span className="font-medium">Next Billing:</span>
                  <p className="text-muted-foreground">March 15, 2024</p>
                </div>
                <div>
                  <span className="font-medium">Started:</span>
                  <p className="text-muted-foreground">January 15, 2024</p>
                </div>
                <div>
                  <span className="font-medium">Auto-Renewal:</span>
                  <p className="text-muted-foreground">Enabled</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Included Features:</span>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Unlimited menu selections</li>
                  <li>• Priority customer support</li>
                  <li>• Advanced meal planning</li>
                  <li>• Nutritional insights</li>
                  <li>• Family sharing (up to 4 members)</li>
                </ul>
              </div>
            </div>
          </div>

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
