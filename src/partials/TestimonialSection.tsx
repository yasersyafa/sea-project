import { useState } from "react"
import { LogIn, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router"
import useTestimonial from "@/hooks/useTestimonial"
import getInitials from "@/constants/testimonial"

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  interactive?: boolean
}) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          disabled={!interactive}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (interactive ? hoverRating || rating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function TestimonialSection() {
  // get profile user
  const { getUser } = useAuth()
  const user = getUser()

  // useTestimonial
  const { useTestimonialQuery, submitTestimonial } = useTestimonial()
  const { data, refetch } = useTestimonialQuery()
  console.log(data)

  // form data
  const [formData, setFormData] = useState({
    name: user?.name,
    message: "",
    rating: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message || formData.rating === 0) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await submitTestimonial(formData, refetch)

    // Reset form
    setFormData({ name: user?.name, message: "", rating: 0 })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="w-full bg-emerald-100 pt-32 pb-10">
        <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Testimonial Carousel */}
        <section className="space-y-6">
            <div className="text-center space-y-2">
            <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-center text-emerald-600">What Our Customers Say</h2>
            <p className="text-muted-foreground text-2xl">Don't just take our word for it - hear from our satisfied customers</p>
            </div>

            <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
                {data && data.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border border-[#2D4F2B]">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback className="bg-[#2D4F2B] text-primary-foreground">
                                {getInitials(testimonial.user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">{testimonial.user.name}</h4>
                                <StarRating rating={testimonial.rating} />
                            </div>
                            </div>
                            <blockquote className="text-sm text-muted-foreground leading-relaxed">
                            "{testimonial.message}"
                            </blockquote>
                        </CardContent>
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </section>

        {/* Testimonial Submission Form */}
        <section className="max-w-3xl mx-auto relative">
            <Card className="border border-[#2D4F2B]">
            <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>
                We'd love to hear about your experience with our service. Your feedback helps us improve and helps others
                make informed decisions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <Input
                    id="customer-name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    disabled
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center gap-2">
                    <StarRating
                        rating={formData.rating}
                        onRatingChange={(rating) => handleInputChange("rating", rating)}
                        interactive={true}
                    />
                    <span className="text-sm text-muted-foreground">
                        {formData.rating > 0 ? `${formData.rating} out of 5 stars` : "Click to rate"}
                    </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="review-message">Review Message</Label>
                    <Textarea
                    id="review-message"
                    placeholder="Tell us about your experience..."
                    className="min-h-[120px] resize-none"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    />
                    <p className="text-xs text-muted-foreground">
                    Share specific details about what you liked or how we could improve.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting || !formData.name || !formData.message || formData.rating === 0}
                >
                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                </Button>
                </form>

                {/* unauthorized state */}
                {!user && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md">
                    <div className="text-center space-y-4 p-6 max-w-md">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Join Our Community</h3>
                        <p className="text-muted-foreground">
                          Sign in to share your experience and help others discover what makes our service special. Your
                          voice matters!
                        </p>
                      </div>
                      <div className="space-y-3">
                        <Link to={'/login'}>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer" size="lg">
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In to Share Your Story
                          </Button>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-3">
                          Don't have an account?{" "}
                          <Link to={'/register'} className="text-emerald-600 cursor-pointer hover:underline">Sign up for free</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </CardContent>
            </Card>
        </section>
        </div>
    </div>
  )
}
