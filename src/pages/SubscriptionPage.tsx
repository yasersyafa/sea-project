import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Star, Users, Clock, Truck } from "lucide-react"

const plans = [
  {
    id: "basic",
    name: "Essential",
    price: 89,
    description: "Perfect for small families",
    features: ["3 meals per week", "Serves 2-3 people", "Basic menu selection", "Standard delivery", "Email support"],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    description: "Most popular choice",
    features: [
      "5 meals per week",
      "Serves 3-4 people",
      "Premium menu selection",
      "Priority delivery",
      "Phone & email support",
      "Dietary customization",
    ],
    popular: true,
  },
  {
    id: "family",
    name: "Family",
    price: 219,
    description: "Great for larger families",
    features: [
      "7 meals per week",
      "Serves 4-6 people",
      "Full menu access",
      "Express delivery",
      "24/7 support",
      "Custom meal planning",
      "Nutrition consultation",
    ],
    popular: false,
  },
]

const addOns = [
  { id: "desserts", name: "Weekly Desserts", price: 25 },
  { id: "beverages", name: "Premium Beverages", price: 15 },
  { id: "breakfast", name: "Breakfast Add-on", price: 35 },
  { id: "snacks", name: "Healthy Snacks", price: 20 },
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    dietaryRestrictions: "",
    deliveryInstructions: "",
  })

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)
  const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find((a) => a.id === addOnId)
    return total + (addOn?.price || 0)
  }, 0)
  const totalPrice = (selectedPlanData?.price || 0) + addOnTotal

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddOns([...selectedAddOns, addOnId])
    } else {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addOnId))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscription data:", {
      plan: selectedPlan,
      addOns: selectedAddOns,
      formData,
      totalPrice,
    })
    // Handle subscription submission here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Meal Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fresh, chef-prepared meals delivered to your door. No cooking, no cleanup, just delicious food.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plans Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Plan</h3>

            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                  <Label htmlFor={plan.id} className="cursor-pointer">
                    <Card
                      className={`h-full transition-all duration-200 hover:shadow-lg ${
                        selectedPlan === plan.id ? "ring-2 ring-orange-500 shadow-lg" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-orange-500 text-white px-3 py-1">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                          <span className="text-gray-600">/week</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Add-ons Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add-ons (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {addOns.map((addOn) => (
                  <div key={addOn.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={addOn.id}
                      checked={selectedAddOns.includes(addOn.id)}
                      onCheckedChange={(checked) => handleAddOnChange(addOn.id, checked as boolean)}
                    />
                    <Label htmlFor={addOn.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{addOn.name}</span>
                        <span className="text-gray-600">+${addOn.price}/week</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    placeholder="Please list any allergies, dietary preferences, or restrictions..."
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                  <Textarea
                    id="deliveryInstructions"
                    placeholder="Special delivery instructions, gate codes, etc..."
                    value={formData.deliveryInstructions}
                    onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{selectedPlanData?.name} Plan</span>
                  <span>${selectedPlanData?.price}/week</span>
                </div>

                {selectedAddOns.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">Add-ons:</h4>
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId)
                        return addOn ? (
                          <div key={addOnId} className="flex justify-between text-sm">
                            <span>{addOn.name}</span>
                            <span>+${addOn.price}/week</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  </>
                )}

                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total per week</span>
                  <span>${totalPrice}</span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Free delivery included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Cancel or pause anytime</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                >
                  Start My Subscription
                </Button>
              </CardFooter>
            </Card>

            {/* Trust Indicators */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex -space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Amazing food quality and convenience. Our family loves every meal!"
                  </p>
                  <p className="text-xs text-gray-500">- Sarah M., Premium subscriber</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
