import { createBrowserRouter } from "react-router"
import HomePage from "@/pages/HomePage"

const App = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  }
])

export default App
