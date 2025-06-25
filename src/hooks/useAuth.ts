import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import api from "@/api/api"
import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
    id: number,
    email: string,
    name: string,
    telephone: string,
    role: 'user' | 'admin',
    exp: number,
    iat: number
}

export function useAuth() {
    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/users/login', { email, password })
            localStorage.setItem('token', res.data.token)
            toast.success('Login successful')
            navigate('/')
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Login failed')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        toast.info('Logged out')
        navigate('/')
    }

    const getToken = () => {
        return localStorage.getItem('token')
    }

    const getUser = (): JwtPayload | null => {
        const token = getToken()
        if(!token) return null

        try {
            const decoded = jwtDecode<JwtPayload>(token)

            if(decoded.exp * 1000 < Date.now()) {
                logout()
                return null
            }
            console.log(decoded)
            return decoded
        } catch {
            logout()
            return null
        }
    }

    const isLoggedIn = () => !!getUser()

    return {
        login,
        logout,
        getUser,
        getToken,
        isLoggedIn
    }
}
