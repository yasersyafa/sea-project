import api from "@/api/api"
import { toast } from "react-toastify"
import { useAuth } from "./useAuth"

export function useSubscription() {
  const { getToken } = useAuth()

  const submitSubscription = async (formData: {
    plan: string
    mealTypes: string[]
    deliveryDays: string[]
    allergies: string
  }) => {
    try {
      await api.post("/subscriptions", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      toast.success("Subscription submitted successfully!")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit subscription")
      throw err
    }
  }

  return {
    submitSubscription
  }
}
