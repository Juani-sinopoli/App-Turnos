import { Professional, Service } from '../types/booking'
import { parseHour } from '../utils/timeHelpers'
export { generateTimeSlots } from '../utils/timeHelpers'

// Mock professionals with different specialties
export const professionals: Professional[] = [
    {
        id: '1',
        name: 'María González',
        specialties: [Service.HAIRCUT, Service.COLORING]
    },
    {
        id: '2',
        name: 'Laura Martínez',
        specialties: [Service.MANICURE, Service.FACIAL]
    },
    {
        id: '3',
        name: 'Ana Rodríguez',
        specialties: [Service.HAIRCUT, Service.MASSAGE]
    },
    {
        id: '4',
        name: 'Sofia López',
        specialties: [Service.COLORING, Service.FACIAL, Service.MASSAGE]
    }
]

// Professional availability by day of week and time
// María: Mon-Fri 9:00-14:00
// Laura: Mon-Fri 14:00-18:00
// Ana: Tue-Sat 10:00-16:00
// Sofia: Wed-Sun 9:00-18:00

export const isProfessionalAvailable = (
    professionalId: string,
    date: Date,
    time: string
): boolean => {
    const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
    const hour = parseHour(time)

    switch (professionalId) {
        case '1': // María: Mon-Fri 9:00-14:00
            return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 14

        case '2': // Laura: Mon-Fri 14:00-18:00
            return dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 14 && hour < 18

        case '3': // Ana: Tue-Sat 10:00-16:00
            return dayOfWeek >= 2 && dayOfWeek <= 6 && hour >= 10 && hour < 16

        case '4': // Sofia: Wed-Sun 9:00-18:00
            return (dayOfWeek === 0 || dayOfWeek >= 3) && hour >= 9 && hour < 18

        default:
            return false
    }
}

// Get available professionals for a specific service, date, and time
export const getAvailableProfessionals = (
    service: Service,
    date: Date,
    time: string
): Professional[] => {
    return professionals.filter(prof => {
        const hasSpecialty = prof.specialties.includes(service)
        const isAvailable = isProfessionalAvailable(prof.id, date, time)
        return hasSpecialty && isAvailable
    })
}
