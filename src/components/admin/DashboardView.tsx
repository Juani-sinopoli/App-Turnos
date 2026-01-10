import React, { useState } from 'react'
import AppointmentModal from './calendar/AppointmentModal'
import CalendarHeader, { CalendarViewType } from './calendar/CalendarHeader'
import WeekView from './calendar/WeekView'
import { Appointment } from '../../types/booking'
import './DashboardView.css'

// Initial Mock data
const initialAppointments: Appointment[] = [
    { id: '1', client: 'Juan Pérez', service: 'Corte de Cabello', professional: 'María González', time: '10:00', day: 'Lunes' },
    { id: '2', client: 'Ana López', service: 'Manicura', professional: 'Laura Martínez', time: '11:30', day: 'Lunes' },
    { id: '3', client: 'Carlos Ruiz', service: 'Masaje', professional: 'Ana Rodríguez', time: '14:00', day: 'Martes' },
    { id: '4', client: 'María García', service: 'Tratamiento Facial', professional: 'Sofia López', time: '15:30', day: 'Miércoles' },
]

function DashboardView() {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

    // View State
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<CalendarViewType>('week')

    // Filters
    const [selectedService, setSelectedService] = useState<string>('all')
    const [selectedProfessional, setSelectedProfessional] = useState<string>('all')

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState<{ day?: string, time?: string, client?: string } | null>(null)

    const weekDaysFull = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

    // Navigation Handlers
    const handlePrev = () => {
        const newDate = new Date(currentDate)
        if (view === 'week') newDate.setDate(newDate.getDate() - 7)
        if (view === 'day') newDate.setDate(newDate.getDate() - 1)
        if (view === 'month') newDate.setMonth(newDate.getMonth() - 1)
        setCurrentDate(newDate)
    }

    const handleNext = () => {
        const newDate = new Date(currentDate)
        if (view === 'week') newDate.setDate(newDate.getDate() + 7)
        if (view === 'day') newDate.setDate(newDate.getDate() + 1)
        if (view === 'month') newDate.setMonth(newDate.getMonth() + 1)
        setCurrentDate(newDate)
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    // Modal & CRUD Handlers
    const handleNewAppointmentClick = () => {
        setModalData(null)
        setIsModalOpen(true)
    }

    const handleSlotClick = (date: Date, time: string) => {
        // Convert JS Date day index (0=Sun) to our mock "Lunes" string format
        const dayIndex = date.getDay()
        const dayName = weekDaysFull[dayIndex === 0 ? 6 : dayIndex - 1]

        setModalData({
            day: dayName,
            time: time
        })
        setIsModalOpen(true)
    }

    const handleEventClick = (apt: Appointment) => {
        setModalData(apt)
        setIsModalOpen(true)
    }

    const handleEventDrop = (id: string, newDate: Date, newTime: string) => {
        const dayIndex = newDate.getDay()
        const newDayName = weekDaysFull[dayIndex === 0 ? 6 : dayIndex - 1] || 'Lunes'

        setAppointments(prev => prev.map(apt => {
            if (apt.id === id) {
                return { ...apt, day: newDayName, time: newTime }
            }
            return apt
        }))
    }

    const handleSaveAppointment = (newAptData: any) => {
        setAppointments(prev => {
            // unique ID logic missing in simple mock update

            const newAppointment: Appointment = {
                id: Date.now().toString(),
                ...newAptData
            }
            return [...prev, newAppointment]
        })
    }

    // Filter Logic
    const filteredAppointments = appointments.filter(apt => {
        if (selectedService !== 'all' && apt.service !== selectedService) return false
        if (selectedProfessional !== 'all' && !apt.professional.toLowerCase().includes(selectedProfessional)) return false
        return true
    })

    return (
        <div className="dashboard-view">
            {/* Header with Title and Button */}
            <div className="dashboard-header-row">
                {/* Filters Section */}
                <div className="dashboard-filters">
                    <div className="filter-group">
                        <label>Servicio</label>
                        <select
                            className="filter-select"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="haircut">Corte de Cabello</option>
                            <option value="coloring">Coloración</option>
                            <option value="manicure">Manicura</option>
                            <option value="facial">Tratamiento Facial</option>
                            <option value="massage">Masaje</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Profesional</label>
                        <select
                            className="filter-select"
                            value={selectedProfessional}
                            onChange={(e) => setSelectedProfessional(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="maria">María González</option>
                            <option value="laura">Laura Martínez</option>
                            <option value="ana">Ana Rodríguez</option>
                            <option value="sofia">Sofia López</option>
                        </select>
                    </div>
                </div>

                <div className="header-actions">
                    <button className="btn-new-appointment" onClick={handleNewAppointmentClick}>
                        + Nuevo turno
                    </button>
                </div>
            </div>

            {/* Calendar Container */}
            <div className="calendar-section">
                <CalendarHeader
                    currentDate={currentDate}
                    view={view}
                    onViewChange={setView}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onToday={handleToday}
                />

                {view === 'week' && (
                    <WeekView
                        currentDate={currentDate}
                        appointments={filteredAppointments}
                        onSlotClick={handleSlotClick}
                        onEventClick={handleEventClick}
                        onEventDrop={handleEventDrop}
                    />
                )}

                {view !== 'week' && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666', border: '1px solid #ddd', borderRadius: '8px' }}>
                        Vista {view === 'day' ? 'Diaria' : 'Mensual'} en construcción...
                    </div>
                )}
            </div>

            {/* Appointments List Section */}
            <div className="appointments-section">
                <h2 className="section-title">Lista de Turnos</h2>

                <div className="appointments-table-container">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Cliente ▲</th>
                                <th>Servicio ▼</th>
                                <th>Profesional ▼</th>
                                <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((apt) => (
                                <tr key={apt.id}>
                                    <td className="client-cell">{apt.client}</td>
                                    <td>{apt.service}</td>
                                    <td>{apt.professional}</td>
                                    <td className="time-cell">{apt.day} {apt.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAppointment}
                initialData={modalData}
            />
        </div>
    )
}

export default DashboardView
