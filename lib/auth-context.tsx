"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AuthContextType = {
  user: string | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(storedUser)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (username: string) => {
    setUser(username)
    setIsAuthenticated(true)
    localStorage.setItem("user", username)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: mounted ? isAuthenticated : false, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

