import { ContactBanner } from "@/partials/ContactBanner"
import NavigationBar from "@/partials/NavigationBar"
import { Outlet } from "react-router"

const UserLayout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <ContactBanner />
        </>
    )
}

export default UserLayout