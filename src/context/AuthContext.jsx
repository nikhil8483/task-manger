import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    setIsAuthenticated(!!token)
    if (savedUser) setUser(JSON.parse(savedUser))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    
    const token = res.data.data?.token
    const userData = {
      name: res.data.data?.name,
      email: res.data.data?.email,
      role: res.data.data?.role,
      userId: res.data.data?.userId,
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)