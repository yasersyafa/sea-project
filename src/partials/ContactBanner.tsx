import { useState } from "react"
import { X, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ContactBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2D4F2B] text-white shadow-lg border-t border-[#1A2E19]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-300" />
              <span className="text-sm">
                <span className="text-slate-300">Manager:</span> <span className="font-medium">Brian</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-300" />
              <span className="text-sm">
                <span className="text-slate-300">Phone:</span> <span className="font-medium">+628123456789</span>
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-[#1A2E19]"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close banner</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
