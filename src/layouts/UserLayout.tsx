import { ContactBanner } from "@/partials/ContactBanner"
import FooterSection from "@/partials/FooterSection"
import NavigationBar from "@/partials/NavigationBar"
import { useState } from "react"
import { Outlet } from "react-router"

const UserLayout = () => {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <div className="overflow-x-hidden">
            
            <NavigationBar onContactClicked={() => setIsVisible(true)} />
            <Outlet />
            <ContactBanner onClose={() => setIsVisible(false)} isVisible={isVisible} />
            <FooterSection />
        </div>
    )
}

export default UserLayout