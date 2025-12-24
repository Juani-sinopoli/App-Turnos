/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date | null, date2: Date): boolean => {
    if (!date1) return false
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
}

/**
 * Check if a date is in the past
 */
export const isPastDate = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
}

/**
 * Get all days in a month including padding for calendar grid
 */
export const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: Date[] = []

    // Add empty slots for days before month starts
    const firstDayOfWeek = firstDay.getDay()
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(new Date(0)) // Placeholder
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        days.push(new Date(year, month, day))
    }

    return days
}

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
