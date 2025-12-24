import { useBookingContext } from '../context/BookingContext'
import { ConfirmedBooking } from '../types/booking'
import { professionals } from '../data/mockData'
import ServiceSelector from './ServiceSelector'
import Calendar from './Calendar'
import TimeSlotPicker from './TimeSlotPicker'
import ProfessionalSelector from './ProfessionalSelector'
import Button from './Button'
import './BookingScreen.css'

interface BookingScreenProps {
    onConfirm: (booking: ConfirmedBooking) => void
}

function BookingScreen({ onConfirm }: BookingScreenProps) {
    const {
        selectedService,
        selectedDate,
        selectedTime,
        selectedProfessionalId,
        setSelectedService,
        setSelectedDate,
        setSelectedTime,
        setSelectedProfessionalId,
        isBookingComplete
    } = useBookingContext()

    const handleConfirm = () => {
        if (isBookingComplete && selectedService && selectedDate && selectedTime && selectedProfessionalId) {
            const professional = professionals.find(p => p.id === selectedProfessionalId)

            if (professional) {
                const confirmedBooking: ConfirmedBooking = {
                    service: selectedService,
                    date: selectedDate,
                    time: selectedTime,
                    professional: professional,
                    confirmationId: generateConfirmationId()
                }

                console.log('Booking confirmed:', confirmedBooking)
                onConfirm(confirmedBooking)
            }
        }
    }

    const generateConfirmationId = (): string => {
        return Math.random().toString(36).substring(2, 10).toUpperCase()
    }

    return (
        <div className="booking-screen">
            <div className="booking-container">
                <h1 className="booking-title">Reserva tu Turno</h1>
                <p className="booking-subtitle">Completa los siguientes pasos para agendar</p>

                <div className="booking-content">
                    {/* Step 1: Service Selection */}
                    <ServiceSelector
                        selectedService={selectedService}
                        onSelectService={setSelectedService}
                    />

                    {/* Step 2: Date and Time Selection */}
                    {selectedService && (
                        <div className="date-time-section">
                            <h3 className="section-title">2. Selecciona Fecha y Horario</h3>
                            <Calendar
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                            />
                            <TimeSlotPicker
                                selectedService={selectedService}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onSelectTime={setSelectedTime}
                            />
                        </div>
                    )}

                    {/* Step 3: Professional Selection */}
                    <ProfessionalSelector
                        selectedService={selectedService}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedProfessionalId={selectedProfessionalId}
                        onSelectProfessional={setSelectedProfessionalId}
                    />

                    {/* Confirmation Button */}
                    {selectedService && (
                        <div className="confirmation-section">
                            <Button
                                onClick={handleConfirm}
                                disabled={!isBookingComplete}
                                variant="primary"
                            >
                                Confirmar Turno
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingScreen
