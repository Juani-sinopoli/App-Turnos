import React, { useState, useEffect } from 'react'
import { professionals } from '../../../data/mockData'
import '../calendar/AppointmentModal.css' // Reuse modal styles

interface ServiceData {
    id: string
    name: string
    professionals: string[]
    duration: number
    price: number
}

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (service: Omit<ServiceData, 'id'>) => void
    initialData?: ServiceData | null
}

function ServiceModal({ isOpen, onClose, onSave, initialData }: ServiceModalProps) {
    const [name, setName] = useState('')
    const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>([])
    const [duration, setDuration] = useState(60)
    const [price, setPrice] = useState(0)

    // Reset or Load data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name)
                setSelectedProfessionals(initialData.professionals)
                setDuration(initialData.duration)
                setPrice(initialData.price)
            } else {
                setName('')
                setSelectedProfessionals([])
                setDuration(60)
                setPrice(0)
            }
        }
    }, [isOpen, initialData])

    const handleProfessionalToggle = (profName: string) => {
        setSelectedProfessionals(prev => {
            if (prev.includes(profName)) {
                return prev.filter(p => p !== profName)
            } else {
                return [...prev, profName]
            }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            name,
            professionals: selectedProfessionals,
            duration,
            price
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="appointment-modal-overlay">
            <div className="appointment-modal">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {initialData ? 'Editar Servicio' : 'Nuevo Servicio'}
                    </h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Servicio</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Corte de Pelo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Profesionales Habilitados</label>
                        <div className="checkbox-list-container">
                            {professionals.map(prof => (
                                <label key={prof.id} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedProfessionals.includes(prof.name)}
                                        onChange={() => handleProfessionalToggle(prof.name)}
                                    />
                                    {prof.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group" style={{ flexDirection: 'row', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label>Duración (min)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                min="15"
                                step="15"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Precio ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                min="0"
                                style={{ width: '100%' }}
                            />
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

export default ServiceModal
