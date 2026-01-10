// Service types
export enum Service {
    HAIRCUT = 'Corte de Cabello',
    COLORING = 'Coloración',
    MANICURE = 'Manicura',
    FACIAL = 'Tratamiento Facial',
    MASSAGE = 'Masaje Relajante'
}

// Professional interface
export interface Professional {
    id: string
    name: string
    avatar?: string
    specialties: Service[]
}

// Time slot interface
export interface TimeSlot {
    time: string  // "09:00", "10:00", etc.
    available: boolean
    professionalIds: string[]  // IDs of available professionals
}

// Day availability interface
export interface DayAvailability {
    date: Date
    slots: TimeSlot[]
}

// Booking state interface
export interface BookingState {
    service: Service | null
    date: Date | null
    time: string | null
    professionalId: string | null
}

// Confirmed booking interface for confirmation screen
export interface ConfirmedBooking {
    service: Service
    date: Date
    time: string
    professional: Professional
    confirmationId: string
}

export interface Appointment {
    id: string
    client: string
    service: string
    professional: string
    time: string // HH:mm
    day: string
    status?: 'booked' | 'blocked'
    duration?: number // minutes
}
