import { createContext, useContext, ReactNode } from 'react'
import { useBooking, UseBookingReturn } from '../hooks/useBooking'

const BookingContext = createContext<UseBookingReturn | null>(null)

interface BookingProviderProps {
    children: ReactNode
}

/**
 * Booking Context Provider
 * Provides booking state to all child components
 */
export const BookingProvider = ({ children }: BookingProviderProps) => {
    const booking = useBooking()

    return (
        <BookingContext.Provider value={booking}>
            {children}
        </BookingContext.Provider>
    )
}

/**
 * Hook to use booking context
 * Throws error if used outside BookingProvider
 */
export const useBookingContext = (): UseBookingReturn => {
    const context = useContext(BookingContext)

    if (!context) {
        throw new Error('useBookingContext must be used within BookingProvider')
    }

    return context
}
