import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/api/api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/users', {
        name,
        email,
        password,
        telephone,
      })
      toast.success('Register successful! Please login')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register SEA Catering</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <Input
                type="text"
                placeholder="08xxxxxxxx"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <h3 className='text-xs mt-5 text-center'>Already have account? <Link to={'/login'} className='text-emerald-700 font-medium hover:underline'>Sign in here</Link></h3>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
