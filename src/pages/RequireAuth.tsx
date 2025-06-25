import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

interface RequireAuthProps {
  children: ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) {
    // Redirect ke /login, simpan lokasi tujuan agar bisa redirect balik setelah login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
