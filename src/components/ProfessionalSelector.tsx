import { Service } from '../types/booking'
import { getAvailableProfessionals } from '../data/mockData'
import './ProfessionalSelector.css'

interface ProfessionalSelectorProps {
    selectedService: Service | null
    selectedDate: Date | null
    selectedTime: string | null
    selectedProfessionalId: string | null
    onSelectProfessional: (professionalId: string) => void
}

function ProfessionalSelector({
    selectedService,
    selectedDate,
    selectedTime,
    selectedProfessionalId,
    onSelectProfessional
}: ProfessionalSelectorProps) {
    if (!selectedService || !selectedDate || !selectedTime) {
        return null
    }

    const availableProfessionals = getAvailableProfessionals(
        selectedService,
        selectedDate,
        selectedTime
    )

    if (availableProfessionals.length === 0) {
        return (
            <div className="professional-selector">
                <h3 className="section-title">3. Selecciona Profesional</h3>
                <p className="no-professionals">
                    No hay profesionales disponibles para esta selección.
                </p>
            </div>
        )
    }

    return (
        <div className="professional-selector">
            <h3 className="section-title">3. Selecciona Profesional</h3>
            <div className="professionals-grid">
                {availableProfessionals.map((professional) => {
                    const isSelected = selectedProfessionalId === professional.id

                    return (
                        <button
                            key={professional.id}
                            onClick={() => onSelectProfessional(professional.id)}
                            className={`professional-card ${isSelected ? 'selected' : ''}`}
                        >
                            <div className="professional-avatar">
                                {professional.name.charAt(0)}
                            </div>
                            <div className="professional-info">
                                <h4 className="professional-name">{professional.name}</h4>
                                <p className="professional-specialty">
                                    {professional.specialties.slice(0, 2).join(', ')}
                                </p>
                            </div>
                            {isSelected && (
                                <div className="selected-indicator">✓</div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ProfessionalSelector
