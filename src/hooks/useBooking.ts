import { useState, useCallback } from 'react'
import { Service } from '../types/booking'

export interface UseBookingReturn {
    selectedService: Service | null
    selectedDate: Date | null
    selectedTime: string | null
    selectedProfessionalId: string | null
    setSelectedService: (service: Service) => void
    setSelectedDate: (date: Date) => void
    setSelectedTime: (time: string) => void
    setSelectedProfessionalId: (id: string) => void
    isBookingComplete: boolean
    resetBooking: () => void
}

/**
 * Custom hook for managing booking state with cascading resets
 */
export const useBooking = (): UseBookingReturn => {
    const [selectedService, setService] = useState<Service | null>(null)
    const [selectedDate, setDate] = useState<Date | null>(null)
    const [selectedTime, setTime] = useState<string | null>(null)
    const [selectedProfessionalId, setProfessionalId] = useState<string | null>(null)

    // Cascading reset when service changes
    const setSelectedService = useCallback((service: Service) => {
        setService(service)
        setDate(null)
        setTime(null)
        setProfessionalId(null)
    }, [])

    // Cascading reset when date changes
    const setSelectedDate = useCallback((date: Date) => {
        setDate(date)
        setTime(null)
        setProfessionalId(null)
    }, [])

    // Cascading reset when time changes
    const setSelectedTime = useCallback((time: string) => {
        setTime(time)
        setProfessionalId(null)
    }, [])

    const setSelectedProfessionalId = useCallback((id: string) => {
        setProfessionalId(id)
    }, [])

    const isBookingComplete = Boolean(
        selectedService && selectedDate && selectedTime && selectedProfessionalId
    )

    const resetBooking = useCallback(() => {
        setService(null)
        setDate(null)
        setTime(null)
        setProfessionalId(null)
    }, [])

    return {
        selectedService,
        selectedDate,
        selectedTime,
        selectedProfessionalId,
        setSelectedService,
        setSelectedDate,
        setSelectedTime,
        setSelectedProfessionalId,
        isBookingComplete,
        resetBooking
    }
}
