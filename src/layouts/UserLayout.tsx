import NavigationBar from "@/partials/NavigationBar"
import { Outlet } from "react-router"

const UserLayout = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    )
}

export default UserLayout