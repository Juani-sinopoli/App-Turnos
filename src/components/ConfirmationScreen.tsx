import { ConfirmedBooking } from '../types/booking'
import { formatDate } from '../utils/dateHelpers'
import { professionals } from '../data/mockData'
import Button from './Button'
import './ConfirmationScreen.css'

interface ConfirmationScreenProps {
    booking: ConfirmedBooking
    onBookAnother: () => void
    onGoHome: () => void
}

function ConfirmationScreen({ booking, onBookAnother, onGoHome }: ConfirmationScreenProps) {
    const professional = professionals.find(p => p.id === booking.professional.id)

    return (
        <div className="confirmation-screen">
            <div className="confirmation-container">
                <div className="confirmation-content">
                    {/* Success Icon */}
                    <div className="success-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="38" stroke="#10B981" strokeWidth="4" />
                            <path
                                d="M25 40L35 50L55 30"
                                stroke="#10B981"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h1 className="confirmation-title">¡Turno Confirmado!</h1>
                    <p className="confirmation-subtitle">
                        Tu reserva ha sido agendada exitosamente
                    </p>

                    {/* Booking Details */}
                    <div className="booking-details">
                        <div className="detail-row">
                            <span className="detail-label">Servicio</span>
                            <span className="detail-value">{booking.service}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Fecha</span>
                            <span className="detail-value">{formatDate(booking.date)}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Hora</span>
                            <span className="detail-value">{booking.time}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Profesional</span>
                            <span className="detail-value">{professional?.name || 'N/A'}</span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">Código de Confirmación</span>
                            <span className="detail-value confirmation-id">
                                #{booking.confirmationId}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="confirmation-actions">
                        <Button onClick={onBookAnother} variant="primary">
                            Reservar Otro Turno
                        </Button>
                        <Button onClick={onGoHome} variant="secondary">
                            Volver al Inicio
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationScreen
