import React, { useState, useEffect } from 'react'
import { Professional, Service } from '../../../types/booking'
import '../calendar/AppointmentModal.css'

interface ProfessionalModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (professional: Omit<Professional, 'id'>) => void
    initialData?: Professional | null
}

function ProfessionalModal({ isOpen, onClose, onSave, initialData }: ProfessionalModalProps) {
    const [name, setName] = useState('')
    const [selectedSpecialties, setSelectedSpecialties] = useState<Service[]>([])

    // Available services from Enum
    const services = Object.values(Service)

    // Reset or Load data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name)
                setSelectedSpecialties(initialData.specialties)
            } else {
                setName('')
                setSelectedSpecialties([])
            }
        }
    }, [isOpen, initialData])

    const handleSpecialtyToggle = (service: Service) => {
        setSelectedSpecialties(prev => {
            if (prev.includes(service)) {
                return prev.filter(s => s !== service)
            } else {
                return [...prev, service]
            }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            name,
            specialties: selectedSpecialties
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="appointment-modal-overlay">
            <div className="appointment-modal">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {initialData ? 'Editar Profesional' : 'Nuevo Profesional'}
                    </h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. María González"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Especialidades</label>
                        <div className="checkbox-list-container">
                            {services.map(service => (
                                <label key={service} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecialties.includes(service)}
                                        onChange={() => handleSpecialtyToggle(service)}
                                    />
                                    {service}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-save">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfessionalModal
