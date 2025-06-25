import { Button } from "@/components/ui/button"
import { ArrowRight} from "lucide-react"

export default function Jumbotron() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Healthy Meals, <span className="text-green-600">Anytime</span>,{" "}
            <span className="text-emerald-600">Anywhere</span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Customizable healthy meal service with delivery all across Indonesia.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              See Pricing and Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-emerald-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
    </section>
  )
}
