// Header.tsx
import { Menu } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  name: string
  to: string
}

interface NavigationBarProps {
    onContactClicked: () => void
}

const navigationItems: NavItem[] = [
  { name: "Home", to: "/" },
  { name: "Menu", to: "/menu" },
  { name: "Subscription", to: "/subscription" },
]

export default function NavigationBar({ onContactClicked } : NavigationBarProps) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo/Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-[#2D4F2B] md:text-2xl">SEA Catering</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.to ? "text-[#2D4F2B] border-b-2 border-[#2D4F2B] pb-1" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button className="text-sm font-medium transition-colors bg-[#2D4F2B]" onClick={onContactClicked}>Contact Us</Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] pl-5">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">SEA Catering</span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === item.to
                        ? "text-primary bg-primary/10 px-3 py-2 rounded-md"
                        : "text-muted-foreground px-3 py-2"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="text-sm font-medium transition-colors bg-[#2D4F2B]" onClick={onContactClicked}>Contact Us</Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
