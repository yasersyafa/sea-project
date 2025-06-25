import { useRoutes } from "react-router"
import HomePage from "@/pages/HomePage"
import UserLayout from "@/layouts/UserLayout"
import MenuPage from "@/pages/MenuPage"
import SubscriptionPage from "@/pages/SubscriptionPage"
import RequireAuth from "@/pages/RequireAuth"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import ProfilePage from "@/pages/ProfilePage"

const App = () => {
  const routes = useRoutes([
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
          element: (
            <RequireAuth>
              <SubscriptionPage />
            </RequireAuth>
          )
        },
        {
          path: 'profile',
          element: (
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          )
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    }
  ])
  return routes
}

export default App
