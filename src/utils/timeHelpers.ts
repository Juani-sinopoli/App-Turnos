import { BUSINESS_HOURS, TIME_SLOT_INTERVAL_MINUTES } from '../constants/booking.constants'

/**
 * Generate time slots for a day
 */
export const generateTimeSlots = (): string[] => {
    const slots: string[] = []
    const { start, end } = BUSINESS_HOURS

    for (let hour = start; hour < end; hour++) {
        for (let minute = 0; minute < 60; minute += TIME_SLOT_INTERVAL_MINUTES) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            slots.push(timeString)
        }
    }

    return slots
}

/**
 * Parse hour from time string
 */
export const parseHour = (time: string): number => {
    return parseInt(time.split(':')[0] || '0')
}

/**
 * Format time to 12-hour format
 */
export const formatTime12Hour = (time: string): string => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours || '0')
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
}
