import { Link } from "react-router"
import { ChevronRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#3A6B36] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Brand Name */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">SEA Catering</h2>
          </div>

          {/* Quick Links */}
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col justify-start space-y-2">
              <li>
                <Link
                  to="/menu"
                  className="flex items-center hover:text-green-200 transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/subscription"
                  className="flex items-center hover:text-green-200 transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Subscription
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-green-400/30 text-center">
          <p className="text-sm">© 2025 SEA Catering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
