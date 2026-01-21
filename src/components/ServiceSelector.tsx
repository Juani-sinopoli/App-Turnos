import { Service } from '../types/booking'
import './ServiceSelector.css'

interface ServiceSelectorProps {
    selectedService: Service | null
    onSelectService: (service: Service) => void
}

function ServiceSelector({ selectedService, onSelectService }: ServiceSelectorProps) {
    const services = Object.values(Service)

    // Helper to get a generic icon letter/emoji based on service name
    const getServiceIcon = (service: Service) => {
        if (service.includes('Masaje')) return '💆‍♀️'
        if (service.includes('Facial')) return '✨'
        if (service.includes('Manos')) return '💅'
        return '🌿'
    }

    return (
        <div className="service-selector">
            <h3 className="section-title">
                <span className="section-number">1</span>
                Selecciona el Servicio
            </h3>

            <div className="services-grid">
                {services.map((service) => {
                    const isSelected = selectedService === service
                    return (
                        <div
                            key={service}
                            className={`service-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => onSelectService(service)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onSelectService(service);
                                }
                            }}
                        >
                            <div className="service-icon">{getServiceIcon(service)}</div>
                            <span className="service-name">{service}</span>

                            {/* Checkmark indicator */}
                            {isSelected && (
                                <div className="service-check">
                                    <svg className="check-icon" viewBox="0 0 12 12">
                                        <path d="M10.28 2.28L4.5 8.06 1.72 5.28A.75.75 0 00.66 6.34l3.25 3.25c.3.3.77.3 1.06 0l6.25-6.25a.75.75 0 00-1.06-1.06z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiceSelector
