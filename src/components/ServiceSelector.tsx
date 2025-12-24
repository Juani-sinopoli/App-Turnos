import { Service } from '../types/booking'
import './ServiceSelector.css'

interface ServiceSelectorProps {
    selectedService: Service | null
    onSelectService: (service: Service) => void
}

function ServiceSelector({ selectedService, onSelectService }: ServiceSelectorProps) {
    const services = Object.values(Service)

    return (
        <div className="service-selector">
            <h3 className="section-title">1. Selecciona el Servicio</h3>
            <div className="dropdown-container">
                <select
                    value={selectedService || ''}
                    onChange={(e) => onSelectService(e.target.value as Service)}
                    className="service-dropdown"
                >
                    <option value="" disabled>
                        Elige un servicio...
                    </option>
                    {services.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ServiceSelector
