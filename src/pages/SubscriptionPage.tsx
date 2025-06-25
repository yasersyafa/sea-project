import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Phone, User, Calendar, Utensils, AlertCircle } from "lucide-react"
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from "@/hooks/useSubscription"
import { plans, mealTypes, deliveryDays } from '@/constants/subscription'

export default function SubscriptionForm() {
  const { getUser } = useAuth()
  const user = getUser()
  const { submitSubscription } = useSubscription()

  const [formData, setFormData] = useState({
    name: user!.name,
    phone: user!.telephone,
    selectedPlan: "",
    selectedMealTypes: [] as string[],
    selectedDeliveryDays: [] as string[],
    allergies: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateTotalPrice = () => {
    const selectedPlanData = plans.find((plan) => plan.id === formData.selectedPlan)
    if (!selectedPlanData || formData.selectedMealTypes.length === 0 || formData.selectedDeliveryDays.length === 0) {
      return 0
    }

    const planPrice = selectedPlanData.price
    const mealTypesCount = formData.selectedMealTypes.length
    const deliveryDaysCount = formData.selectedDeliveryDays.length
    const multiplier = 4.3

    return planPrice * mealTypesCount * deliveryDaysCount * multiplier
  }

  const handleMealTypeChange = (mealTypeId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedMealTypes: [...prev.selectedMealTypes, mealTypeId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedMealTypes: prev.selectedMealTypes.filter((id) => id !== mealTypeId),
      }))
    }
    if (errors.selectedMealTypes) {
      setErrors((prev) => ({ ...prev, selectedMealTypes: "" }))
    }
  }

  const handleDeliveryDayChange = (dayId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedDeliveryDays: [...prev.selectedDeliveryDays, dayId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedDeliveryDays: prev.selectedDeliveryDays.filter((id) => id !== dayId),
      }))
    }
    if (errors.selectedDeliveryDays) {
      setErrors((prev) => ({ ...prev, selectedDeliveryDays: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Indonesian phone number"
    }

    if (!formData.selectedPlan) {
      newErrors.selectedPlan = "Please select a plan"
    }

    if (formData.selectedMealTypes.length === 0) {
      newErrors.selectedMealTypes = "Please select at least one meal type"
    }

    if (formData.selectedDeliveryDays.length === 0) {
      newErrors.selectedDeliveryDays = "Please select at least one delivery day"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const payload = {
      plan: formData.selectedPlan,
      mealTypes: formData.selectedMealTypes,
      deliveryDays: formData.selectedDeliveryDays,
      allergies: formData.allergies,
    }

    await submitSubscription(payload)
  }

  const totalPrice = calculateTotalPrice()
  const selectedPlanData = plans.find((plan) => plan.id === formData.selectedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Subscription Plans</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Start your healthy journey today! With our meal subscription, you’ll receive daily portions of nutritious, low-calorie meals that are as delicious as they are good for your body — no cooking required.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl" style={{ color: "#2D4F2B" }}>
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={`mt-2 h-12 text-base ${errors.name ? "border-red-500" : ""}`}
                      placeholder="Enter your full name"
                      disabled
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm sm:text-base font-medium">
                      Active Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className={`pl-12 h-12 text-base ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="e.g., +62812345678 or 08123456789"
                        disabled
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Plan Selection */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl" style={{ color: "#2D4F2B" }}>
                    <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
                    Plan Selection <span className="text-red-500">*</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Choose the perfect plan for your lifestyle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.selectedPlan}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, selectedPlan: value }))
                      if (errors.selectedPlan) {
                        setErrors((prev) => ({ ...prev, selectedPlan: "" }))
                      }
                    }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
                  >
                    {plans.map((plan) => (
                      <div key={plan.id} className="relative">
                        <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                        <Label htmlFor={plan.id} className="cursor-pointer">
                          <Card
                            className={`h-full w-full transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                              formData.selectedPlan === plan.id
                                ? "ring-2 shadow-xl transform scale-105"
                                : "hover:shadow-lg"
                            }`}
                            style={{
                              outlineColor: formData.selectedPlan === plan.id ? "#2D4F2B" : "transparent",
                              background:
                                formData.selectedPlan === plan.id
                                  ? "linear-gradient(135deg, #2D4F2B 0%, #3a6b37 100%)"
                                  : "white",
                            }}
                          >
                            <CardHeader className="text-center pb-2 sm:pb-4">
                              <div
                                className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor:
                                    formData.selectedPlan === plan.id ? "rgba(255,255,255,0.2)" : "#f0f4f0",
                                }}
                              >
                                <Utensils
                                  className={`w-8 h-8 sm:w-10 sm:h-10 ${
                                    formData.selectedPlan === plan.id ? "text-white" : "text-emerald-700"
                                  }}`}
                                />
                              </div>
                              <CardTitle
                                className={`text-lg sm:text-xl ${
                                  formData.selectedPlan === plan.id ? "text-white" : "text-emerald-700"
                                }`}
                              >
                                {plan.name}
                              </CardTitle>
                              <CardDescription
                                className={`text-sm ${
                                  formData.selectedPlan === plan.id ? "text-green-100" : "text-gray-600"
                                }`}
                              >
                                {plan.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                              <div className="mb-4">
                                <span
                                  className={`text-2xl sm:text-3xl font-bold ${
                                    formData.selectedPlan === plan.id ? "text-white" : "text-emerald-700"
                                  }}`}
                                >
                                  {formatCurrency(plan.price)}
                                </span>
                                <div
                                  className={`text-sm ${
                                    formData.selectedPlan === plan.id ? "text-green-100" : "text-gray-500"
                                  }}`}
                                >
                                  per meal
                                </div>
                              </div>
                              <div
                                className={`w-full h-1 rounded-full ${
                                  formData.selectedPlan === plan.id ? "bg-white/30" : "bg-[#2D4F2B]/20"
                                }`}
                              >
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    formData.selectedPlan === plan.id ? "bg-white" : "bg-emerald-700"
                                  }`}
                                  style={{ width: formData.selectedPlan === plan.id ? "100%" : "0%" }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.selectedPlan && <p className="text-red-500 text-sm mt-2">{errors.selectedPlan}</p>}
                </CardContent>
              </Card>

              {/* Meal Types */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl" style={{ color: "#2D4F2B" }}>
                    Meal Types <span className="text-red-500">*</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Select one or more meal options (at least one required)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {mealTypes.map((mealType) => (
                      <div key={mealType.id} className="relative">
                        <Checkbox
                          id={mealType.id}
                          checked={formData.selectedMealTypes.includes(mealType.id)}
                          onCheckedChange={(checked) => handleMealTypeChange(mealType.id, checked as boolean)}
                          className="sr-only"
                        />
                        <Label htmlFor={mealType.id} className="cursor-pointer">
                          <Card
                            className={`h-full w-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                              formData.selectedMealTypes.includes(mealType.id)
                                ? "ring-2 shadow-xl transform scale-105"
                                : "hover:shadow-md"
                            }`}
                            style={{
                              outlineColor: formData.selectedMealTypes.includes(mealType.id) ? "#2D4F2B" : "transparent",
                              background: formData.selectedMealTypes.includes(mealType.id)
                                ? "linear-gradient(135deg, #2D4F2B 0%, #3a6b37 100%)"
                                : "white",
                            }}
                          >
                            <CardContent className="p-4 sm:p-6 text-center">
                              <div
                                className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                                style={{
                                  backgroundColor: formData.selectedMealTypes.includes(mealType.id)
                                    ? "rgba(255,255,255,0.2)"
                                    : "#f0f4f0",
                                }}
                              >
                                {mealType.icon}
                              </div>
                              <h3
                                className={`text-base sm:text-lg font-semibold mb-1 ${
                                  formData.selectedMealTypes.includes(mealType.id) ? "text-white" : "text-[#2D4F2B]"
                                }`}
                              >
                                {mealType.name}
                              </h3>
                              <p
                                className={`text-xs sm:text-sm mb-3 ${
                                  formData.selectedMealTypes.includes(mealType.id) ? "text-green-100" : "text-gray-600"
                                }`}
                              >
                                {mealType.time}
                              </p>
                              <div
                                className={`w-full h-1 rounded-full ${
                                  formData.selectedMealTypes.includes(mealType.id) ? "bg-white/30" : "bg-[#2D4F2B]/20"
                                }`}
                              >
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    formData.selectedMealTypes.includes(mealType.id) ? "bg-white" : "bg-[#2D4F2B]"
                                  }`}
                                  style={{ width: formData.selectedMealTypes.includes(mealType.id) ? "100%" : "0%" }}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedMealTypes && <p className="text-red-500 text-sm mt-2">{errors.selectedMealTypes}</p>}
                </CardContent>
              </Card>

              {/* Delivery Days */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl" style={{ color: "#2D4F2B" }}>
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    Delivery Days <span className="text-red-500">*</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Choose the days for meal delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-6">
                    {deliveryDays.map((day) => (
                      <div key={day.id} className="relative">
                        <Checkbox
                          id={day.id}
                          checked={formData.selectedDeliveryDays.includes(day.id)}
                          onCheckedChange={(checked) => handleDeliveryDayChange(day.id, checked as boolean)}
                          className="sr-only"
                        />
                        <Label htmlFor={day.id} className="cursor-pointer">
                          <div
                            className={`relative w-full p-2 sm:p-4 rounded-xl text-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                              formData.selectedDeliveryDays.includes(day.id)
                                ? "shadow-lg transform scale-110"
                                : "hover:shadow-md"
                            }`}
                            style={{
                              background: formData.selectedDeliveryDays.includes(day.id)
                                ? "linear-gradient(135deg, #2D4F2B 0%, #3a6b37 100%)"
                                : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                              border: formData.selectedDeliveryDays.includes(day.id)
                                ? "2px solid #2D4F2B"
                                : "2px solid transparent",
                            }}
                          >
                            {formData.selectedDeliveryDays.includes(day.id) && (
                              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#2D4F2B] rounded-full"></div>
                              </div>
                            )}
                            <div
                              className={`text-xs sm:text-sm font-bold mb-1 ${
                                formData.selectedDeliveryDays.includes(day.id) ? "text-white" : "text-[#2D4F2B]"
                              }`}
                            >
                              {day.short}
                            </div>
                            <div
                              className={`text-[8px] sm:text-[10px] ${
                                formData.selectedDeliveryDays.includes(day.id) ? "text-green-100" : "text-gray-600"
                              }`}
                            >
                              {day.name.slice(0, 3)}
                            </div>
                            <div
                              className={`mt-1 sm:mt-2 w-full h-0.5 rounded-full ${
                                formData.selectedDeliveryDays.includes(day.id) ? "bg-white/50" : "bg-[#2D4F2B]/30"
                              }`}
                            >
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  formData.selectedDeliveryDays.includes(day.id) ? "bg-white" : "bg-emerald-700"
                                }`}
                                style={{ width: formData.selectedDeliveryDays.includes(day.id) ? "100%" : "0%" }}
                              />
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedDeliveryDays && (
                    <p className="text-red-500 text-sm mt-2">{errors.selectedDeliveryDays}</p>
                  )}

                  {/* Quick Selection Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"]
                        setFormData((prev) => ({ ...prev, selectedDeliveryDays: weekdays }))
                      }}
                      className="text-[#2D4F2B] border-[#2D4F2B] hover:bg-[#2D4F2B] hover:text-white text-xs sm:text-sm"
                    >
                      Weekdays Only
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const allDays = deliveryDays.map((day) => day.id)
                        setFormData((prev) => ({ ...prev, selectedDeliveryDays: allDays }))
                      }}
                      className="text-[#2D4F2B] border-[#2D4F2B] hover:bg-[#2D4F2B] hover:text-white text-xs sm:text-sm"
                    >
                      All 7 Days
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, selectedDeliveryDays: [] }))
                      }}
                      className="text-gray-600 border-gray-300 hover:bg-gray-100 text-xs sm:text-sm"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Allergies */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl" style={{ color: "#2D4F2B" }}>
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    Allergies & Dietary Restrictions
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Optional - List any allergies or dietary restrictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.allergies}
                    onChange={(e) => setFormData((prev) => ({ ...prev, allergies: e.target.value }))}
                    placeholder="Please list any allergies, dietary preferences, or restrictions..."
                    rows={4}
                    className="text-base resize-none"
                  />
                </CardContent>
              </Card>

              {/* Mobile Submit Button */}
              <div className="lg:hidden">
                <Button
                  onClick={handleSubmit}
                  className="w-full text-white h-12 text-base font-semibold"
                  style={{ backgroundColor: "#2D4F2B" }}
                  size="lg"
                  disabled={totalPrice === 0}
                >
                  Subscribe Now - {totalPrice > 0 ? formatCurrency(totalPrice) : "Complete Form"}
                </Button>
              </div>
            </form>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-36 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-emerald-700">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlanData && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{selectedPlanData.name}</span>
                    <span className="font-semibold">{formatCurrency(selectedPlanData.price)}/meal</span>
                  </div>
                )}

                {formData.selectedMealTypes.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Selected Meals:</div>
                    <div className="space-y-1">
                      {formData.selectedMealTypes.map((mealTypeId) => {
                        const mealType = mealTypes.find((m) => m.id === mealTypeId)
                        return (
                          <Badge key={mealTypeId} variant="secondary" className="mr-1 mb-1">
                            {mealType?.icon} {mealType?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {formData.selectedDeliveryDays.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Delivery Days:</div>
                    <div className="flex flex-wrap gap-1">
                      {formData.selectedDeliveryDays.map((dayId) => {
                        const day = deliveryDays.find((d) => d.id === dayId)
                        return (
                          <Badge key={dayId} variant="outline" className="text-xs">
                            {day?.short}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {totalPrice > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Plan Price:</span>
                        <span>{formatCurrency(selectedPlanData?.price || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meal Types:</span>
                        <span>{formData.selectedMealTypes.length}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Days:</span>
                        <span>{formData.selectedDeliveryDays.length}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Multiplier:</span>
                        <span>4.3x</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-xl">
                      <span>Monthly Total:</span>
                      <span className="text-emerald-700">{formatCurrency(totalPrice)}</span>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full text-white h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-800"
                  size="lg"
                  disabled={totalPrice === 0}
                >
                  Subscribe Now
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  * All prices include delivery
                  <br />* Cancel or modify anytime
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
