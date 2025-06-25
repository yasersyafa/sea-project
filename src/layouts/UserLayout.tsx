import { ContactBanner } from "@/partials/ContactBanner"
import FooterSection from "@/partials/FooterSection"
import NavigationBar from "@/partials/NavigationBar"
import { useState } from "react"
import { Outlet } from "react-router"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const UserLayout = () => {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <>
            {/* Toast container agar global */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <NavigationBar onContactClicked={() => setIsVisible(true)} />
            <Outlet />
            <ContactBanner onClose={() => setIsVisible(false)} isVisible={isVisible} />
            <FooterSection />
        </>
    )
}

export default UserLayout