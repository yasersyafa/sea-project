export const plans = [
  { id: "diet", name: "Diet Plan", price: 30000, description: "Healthy and balanced meals" },
  { id: "protein", name: "Protein Plan", price: 40000, description: "High-protein focused meals" },
  { id: "royal", name: "Royal Plan", price: 60000, description: "Premium gourmet experience" },
]

export const mealTypes = [
  { id: "breakfast", name: "Breakfast", icon: "🌅", time: "7:00 - 10:00 AM" },
  { id: "lunch", name: "Lunch", icon: "☀️", time: "12:00 - 2:00 PM" },
  { id: "dinner", name: "Dinner", icon: "🌙", time: "6:00 - 9:00 PM" },
]

export const deliveryDays = [
  { id: "monday", name: "Monday", short: "Mon" },
  { id: "tuesday", name: "Tuesday", short: "Tue" },
  { id: "wednesday", name: "Wednesday", short: "Wed" },
  { id: "thursday", name: "Thursday", short: "Thu" },
  { id: "friday", name: "Friday", short: "Fri" },
  { id: "saturday", name: "Saturday", short: "Sat" },
  { id: "sunday", name: "Sunday", short: "Sun" },
]

export interface Subscription {
  id: number
  plan: string
  mealTypes: string[] // ini akan diubah dari JSON.parse
  deliveryDays: string[]
  allergies: string | null
  price: number
  user: {
    id: number
    name: string
    email: string
    telephone: string
  }
}
