import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Utensils, CheckCircle } from "lucide-react"

interface MealPlan {
  id: string
  name: string
  price: number
  description: string
  image: string
  duration: string
  servings: number
  mealsPerWeek: number
  features: string[]
  sampleMeals: string[]
  dietaryOptions: string[]
  popular?: boolean
}

const mealPlans: MealPlan[] = [
  {
    id: "1",
    name: "Essential Plan",
    price: 59.99,
    description: "Perfect for individuals looking to maintain a healthy lifestyle with convenient, nutritious meals.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 2,
    mealsPerWeek: 6,
    features: [
      "Fresh, locally-sourced ingredients",
      "Easy 15-minute preparation",
      "Nutritionist-approved recipes",
      "Flexible delivery schedule",
    ],
    sampleMeals: ["Grilled Salmon with Quinoa", "Mediterranean Chicken Bowl", "Vegetarian Stir-Fry"],
    dietaryOptions: ["Vegetarian", "Gluten-Free", "Low-Carb"],
  },
  {
    id: "2",
    name: "Family Plan",
    price: 119.99,
    description:
      "Designed for families who want to enjoy delicious, home-cooked meals without the hassle of meal planning.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 4,
    mealsPerWeek: 8,
    features: [
      "Family-friendly portions",
      "Kid-approved recipes",
      "Batch cooking options",
      "Weekend meal prep guides",
      "Free delivery",
    ],
    sampleMeals: ["Classic Beef Tacos", "Homestyle Chicken & Rice", "Pasta Primavera", "BBQ Pulled Pork Sandwiches"],
    dietaryOptions: ["Kid-Friendly", "Vegetarian", "Dairy-Free"],
    popular: true,
  },
  {
    id: "3",
    name: "Premium Plan",
    price: 89.99,
    description:
      "Gourmet meals crafted by professional chefs, featuring premium ingredients and sophisticated flavors.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 2,
    mealsPerWeek: 8,
    features: [
      "Chef-curated gourmet recipes",
      "Premium organic ingredients",
      "Wine pairing suggestions",
      "Detailed cooking instructions",
      "Priority customer support",
    ],
    sampleMeals: [
      "Truffle Risotto with Wild Mushrooms",
      "Pan-Seared Duck Breast",
      "Lobster Thermidor",
      "Wagyu Beef Tenderloin",
    ],
    dietaryOptions: ["Keto", "Paleo", "Organic", "Gluten-Free"],
  },
  {
    id: "4",
    name: "Fitness Plan",
    price: 74.99,
    description: "High-protein, balanced meals designed to support your fitness goals and active lifestyle.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 2,
    mealsPerWeek: 7,
    features: [
      "High-protein recipes (25g+ per meal)",
      "Pre and post-workout meal options",
      "Macro-balanced nutrition",
      "Sports nutritionist approved",
      "Calorie-counted portions",
    ],
    sampleMeals: [
      "Protein-Packed Chicken Bowl",
      "Lean Beef & Sweet Potato",
      "Quinoa Power Salad",
      "Turkey & Avocado Wrap",
    ],
    dietaryOptions: ["High-Protein", "Low-Carb", "Keto", "Paleo"],
  },
  {
    id: "5",
    name: "Plant-Based Plan",
    price: 64.99,
    description: "Delicious plant-based meals that prove healthy eating can be both satisfying and flavorful.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 2,
    mealsPerWeek: 6,
    features: [
      "100% plant-based ingredients",
      "Rich in plant proteins",
      "Seasonal produce focus",
      "Environmentally sustainable",
      "Vegan-certified recipes",
    ],
    sampleMeals: [
      "Lentil Bolognese with Zucchini Noodles",
      "Chickpea Curry with Coconut Rice",
      "Buddha Bowl with Tahini Dressing",
      "Black Bean & Quinoa Burgers",
    ],
    dietaryOptions: ["Vegan", "Vegetarian", "Gluten-Free", "Organic"],
  },
  {
    id: "6",
    name: "Quick & Easy Plan",
    price: 49.99,
    description:
      "Simple, fast meals for busy professionals who want healthy food without spending hours in the kitchen.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "Weekly",
    servings: 1,
    mealsPerWeek: 5,
    features: [
      "10-minute meal preparation",
      "Minimal cleanup required",
      "Single-serving portions",
      "Microwave-friendly options",
      "Perfect for busy schedules",
    ],
    sampleMeals: ["Mediterranean Wrap", "Asian Noodle Bowl", "Protein Smoothie Bowl", "Caprese Salad with Chicken"],
    dietaryOptions: ["Quick-Prep", "Vegetarian", "Low-Sodium"],
  },
]

export default function MenuPage() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Choose Your Perfect Meal Plan</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover delicious, nutritious meals delivered to your door. From quick weeknight dinners to gourmet
              experiences, we have the perfect plan for your lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Meal Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealPlans.map((plan) => (
            <Card key={plan.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {plan.popular && (
                <Badge className="absolute top-4 right-4 z-10" style={{ backgroundColor: "#2D4F2B" }}>
                  Most Popular
                </Badge>
              )}

              <div className="relative h-48 w-full">
                <img src={plan.image || "/placeholder.svg"} alt={plan.name} className="object-cover" />
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold" style={{ color: "#2D4F2B" }}>
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500">per week</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{plan.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Utensils className="h-4 w-4" />
                    <span>{plan.mealsPerWeek} meals</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {plan.dietaryOptions.slice(0, 3).map((option) => (
                    <Badge key={option} variant="secondary" className="text-xs">
                      {option}
                    </Badge>
                  ))}
                  {plan.dietaryOptions.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{plan.dietaryOptions.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#2D4F2B" }}
                      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#3A6B36")}
                      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#2D4F2B")}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      See More Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {plan.name}
                        {plan.popular && <Badge style={{ backgroundColor: "#2D4F2B" }}>Most Popular</Badge>}
                      </DialogTitle>
                      <DialogDescription className="text-base">{plan.description}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div className="relative h-64 w-full rounded-lg overflow-hidden">
                        <img src={plan.image || "/placeholder.svg"} alt={plan.name} className="object-cover" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0F7F0" }}>
                          <div className="text-2xl font-bold" style={{ color: "#2D4F2B" }}>
                            ${plan.price}
                          </div>
                          <div className="text-sm text-gray-600">per week</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{plan.mealsPerWeek}</div>
                          <div className="text-sm text-gray-600">meals per week</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          <span>{plan.servings} servings per meal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>{plan.duration} delivery</span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Plan Features</h4>
                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Sample Meals</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {plan.sampleMeals.map((meal, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm font-medium">{meal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-lg mb-3">Dietary Options</h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.dietaryOptions.map((option) => (
                            <Badge key={option} variant="outline" className="text-sm">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          className="flex-1"
                          style={{ backgroundColor: "#2D4F2B" }}
                          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#3A6B36")}
                          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#2D4F2B")}
                        >
                          Select This Plan
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Compare Plans
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
