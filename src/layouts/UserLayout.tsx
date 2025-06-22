import { ContactBanner } from "@/partials/ContactBanner"
import NavigationBar from "@/partials/NavigationBar"
import { useState } from "react"
import { Outlet } from "react-router"

const UserLayout = () => {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <>
            <NavigationBar onContactClicked={() => setIsVisible(true)} />
            <Outlet />
            <ContactBanner onClose={() => setIsVisible(false)} isVisible={isVisible} />
        </>
    )
}

export default UserLayout