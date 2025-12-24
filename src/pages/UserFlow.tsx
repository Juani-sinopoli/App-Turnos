import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { BookingProvider } from '../context/BookingContext'
import { ConfirmedBooking } from '../types/booking'
import Login from '../components/Login'
import BookingScreen from '../components/BookingScreen'
import ConfirmationScreen from '../components/ConfirmationScreen'

/**
 * User Flow - Booking experience for customers
 * Routes: /usuario
 */
function UserFlow() {
    const { isLoggedIn, logout } = useAuthContext()
    const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null)

    const handleConfirm = (booking: ConfirmedBooking) => {
        setConfirmedBooking(booking)
    }

    const handleBookAnother = () => {
        setConfirmedBooking(null)
    }

    const handleGoHome = () => {
        setConfirmedBooking(null)
        logout()
    }

    if (!isLoggedIn) {
        return <Login />
    }

    if (confirmedBooking) {
        return (
            <ConfirmationScreen
                booking={confirmedBooking}
                onBookAnother={handleBookAnother}
                onGoHome={handleGoHome}
            />
        )
    }

    return (
        <BookingProvider>
            <BookingScreen onConfirm={handleConfirm} />
        </BookingProvider>
    )
}

export default UserFlow
