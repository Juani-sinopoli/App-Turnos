import { useState } from 'react'
import './DashboardView.css'

interface Appointment {
    id: string
    client: string
    service: string
    professional: string
    time: string
    day: string
}

// Mock data
const mockAppointments: Appointment[] = [
    { id: '1', client: 'Juan Pérez', service: 'Corte de Cabello', professional: 'María González', time: '10:00', day: 'Lunes' },
    { id: '2', client: 'Ana López', service: 'Manicura', professional: 'Laura Martínez', time: '11:30', day: 'Lunes' },
    { id: '3', client: 'Carlos Ruiz', service: 'Masaje', professional: 'Ana Rodríguez', time: '14:00', day: 'Martes' },
    { id: '4', client: 'María García', service: 'Tratamiento Facial', professional: 'Sofia López', time: '15:30', day: 'Miércoles' },
]

function DashboardView() {
    const [selectedService, setSelectedService] = useState<string>('all')
    const [selectedProfessional, setSelectedProfessional] = useState<string>('all')

    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    const hours = Array.from({ length: 10 }, (_, i) => i + 8) // 8h to 17h

    return (
        <div className="dashboard-view">
            {/* Filters Section */}
            <div className="dashboard-filters">
                <div className="filter-group">
                    <label>Fecha</label>
                    <select className="filter-select">
                        <option>Hoy</option>
                        <option>Esta semana</option>
                        <option>Próxima semana</option>
                    </select>
                </div>
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

            {/* Calendar Section */}
            <div className="calendar-section">
                <h2 className="section-title">Calendario (Vista Semanal)</h2>
                <div className="calendar-grid">
                    {/* Header Row - Days */}
                    <div className="calendar-header">
                        <div className="calendar-cell time-header"></div>
                        {weekDays.map((day, index) => (
                            <div key={index} className="calendar-cell day-header">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Time Rows */}
                    {hours.map((hour) => (
                        <div key={hour} className="calendar-row">
                            <div className="calendar-cell time-cell">
                                {hour.toString().padStart(2, '0')}h
                            </div>
                            {weekDays.map((_, dayIndex) => (
                                <div key={`${hour}-${dayIndex}`} className="calendar-cell slot-cell">
                                    {/* Show appointments if any */}
                                    {hour === 10 && dayIndex === 0 && (
                                        <div className="appointment-block">
                                            <span className="appointment-time">10:00</span>
                                            <span className="appointment-client">Juan P.</span>
                                        </div>
                                    )}
                                    {hour === 11 && dayIndex === 0 && (
                                        <div className="appointment-block">
                                            <span className="appointment-time">11:30</span>
                                            <span className="appointment-client">Ana L.</span>
                                        </div>
                                    )}
                                    {hour === 14 && dayIndex === 1 && (
                                        <div className="appointment-block">
                                            <span className="appointment-time">14:00</span>
                                            <span className="appointment-client">Carlos R.</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
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
                            {mockAppointments.map((apt) => (
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
        </div>
    )
}

export default DashboardView
