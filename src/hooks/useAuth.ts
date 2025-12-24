import { useState, useCallback } from 'react'

export interface UseAuthReturn {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

/**
 * Custom hook for managing authentication state
 */
export const useAuth = (): UseAuthReturn => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = useCallback(() => {
        setIsLoggedIn(true)
        // TODO: Add actual authentication logic
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
        // TODO: Add actual logout logic
    }, [])

    return {
        isLoggedIn,
        login,
        logout
    }
}
