import React, { useState, useEffect } from 'react'
import { Service } from '../../../types/booking'
import { professionals } from '../../../data/mockData'
import './AppointmentModal.css'

interface AppointmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (appointment: any) => void
    initialData?: {
        day?: string
        time?: string
        client?: string
        service?: string
        professional?: string
    } | null
}

function AppointmentModal({ isOpen, onClose, onSave, initialData }: AppointmentModalProps) {
    const [client, setClient] = useState('')
    const [service, setService] = useState<Service | ''>('')
    const [professional, setProfessional] = useState('')
    const [day, setDay] = useState('Lunes')
    const [time, setTime] = useState('09:00')

    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const services = Object.values(Service)

    // Reset or populate form when opening
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setClient(initialData.client || '')
                setService((initialData.service as Service) || '')
                setProfessional(initialData.professional || '')
                setDay(initialData.day || 'Lunes')
                setTime(initialData.time || '09:00')
            } else {
                setClient('')
                setService('')
                setProfessional('')
                setDay('Lunes')
                setTime('09:00')
            }
        }
    }, [isOpen, initialData])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            client,
            service,
            professional, // In real app, this should be ID, here we use name based on dashboard mock
            day,
            time
        })
        onClose()
    }

    return (
        <div className="appointment-modal-overlay">
            <div className="appointment-modal">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {initialData?.client ? 'Editar Turno' : 'Nuevo Turno'}
                    </h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Cliente</label>
                        <input
                            type="text"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            placeholder="Nombre del cliente"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Día</label>
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            {weekDays.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Hora</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Servicio</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value as Service)}
                            required
                        >
                            <option value="">Seleccionar servicio...</option>
                            {services.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Profesional</label>
                        <select
                            value={professional}
                            onChange={(e) => setProfessional(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar profesional...</option>
                            {professionals.map(p => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentModal
