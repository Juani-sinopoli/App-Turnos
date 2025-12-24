import { createContext, useContext, ReactNode } from 'react'
import { useAuth, UseAuthReturn } from '../hooks/useAuth'

const AuthContext = createContext<UseAuthReturn | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

/**
 * Auth Context Provider
 * Provides authentication state to all child components
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuth()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * Hook to use auth context
 * Throws error if used outside AuthProvider
 */
export const useAuthContext = (): UseAuthReturn => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider')
    }

    return context
}
