import api from "@/api/api"
import { toast } from "react-toastify"
import { useAuth } from "./useAuth"
import { useQuery } from "@tanstack/react-query"
import type { Testimonial } from "@/constants/testimonial"

export default function useTestimonial() {
    const { getToken } = useAuth()

    const submitTestimonial = async (formdata : {
        message: string,
        rating: number
    }, refetch : () => void) => {
        try {
            await api.post('/testimonials', formdata, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            toast.success('Testimonial Submitted')
            refetch()
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to submit testimonial")
            throw err
        }
    }

    const getTestimonial = async () => {
        const res = await api.get('/testimonials')
        return res.data
    }

    const useTestimonialQuery = () => {
        return useQuery<Testimonial[]>({
            queryKey: ['testimonials'],
            queryFn: getTestimonial
        })
    }

    return {
        submitTestimonial,
        useTestimonialQuery
    }
}