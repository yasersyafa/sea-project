import { createBrowserRouter } from "react-router"
import HomePage from "@/pages/HomePage"
import UserLayout from "@/layouts/UserLayout"
import MenuPage from "@/pages/MenuPage"
import SubscriptionPage from "./pages/SubscriptionPage"

const App = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'menu',
        element: <MenuPage />
      },
      {
        path: 'subscription',
        element: <SubscriptionPage />
      }
    ]
  }
])

export default App
