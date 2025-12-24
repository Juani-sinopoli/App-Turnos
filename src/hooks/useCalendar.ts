import { useState, useCallback } from 'react'
import { getDaysInMonth } from '../utils/dateHelpers'

export interface UseCalendarReturn {
    currentMonth: Date
    days: Date[]
    nextMonth: () => void
    previousMonth: () => void
    setMonth: (date: Date) => void
}

/**
 * Custom hook for calendar navigation and day generation
 */
export const useCalendar = (initialDate: Date = new Date()): UseCalendarReturn => {
    const [currentMonth, setCurrentMonth] = useState(initialDate)

    const days = getDaysInMonth(currentMonth)

    const nextMonth = useCallback(() => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }, [])

    const previousMonth = useCallback(() => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }, [])

    const setMonth = useCallback((date: Date) => {
        setCurrentMonth(date)
    }, [])

    return {
        currentMonth,
        days,
        nextMonth,
        previousMonth,
        setMonth
    }
}
