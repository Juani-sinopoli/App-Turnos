import React from 'react'
import './WeekView.css'

import { Appointment } from '../../../types/booking'

interface WeekViewProps {
    currentDate: Date
    appointments: Appointment[]
    onSlotClick: (date: Date, time: string) => void
    onEventClick: (appointment: Appointment) => void
    onEventDrop: (appointmentId: string, newDate: Date, newTime: string) => void
}

function WeekView({ currentDate, appointments, onSlotClick, onEventClick, onEventDrop }: WeekViewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i) // 0-23
    const startHour = 8
    const endHour = 20
    const displayHours = hours.slice(startHour, endHour + 1)

    // Helper to get dates for the week
    const getWeekDates = (date: Date) => {
        const week = []
        const current = new Date(date)
        const day = current.getDay()
        const diff = current.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday

        const monday = new Date(current.setDate(diff))

        for (let i = 0; i < 7; i++) {
            const d = new Date(monday)
            d.setDate(monday.getDate() + i)
            week.push(d)
        }
        return week
    }

    const weekDates = getWeekDates(currentDate)
    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

    // Drag handlers
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('appointmentId', id)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent, date: Date, hour: number) => {
        e.preventDefault()
        const appointmentId = e.dataTransfer.getData('appointmentId')
        if (appointmentId) {
            const timeStr = `${hour.toString().padStart(2, '0')}:00`
            onEventDrop(appointmentId, date, timeStr)
        }
    }

    // Helper to check if a date is today
    const isToday = (date: Date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    // Get appointments for a specific day
    const getAppointmentsForDay = (date: Date) => {
        const dayName = weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1]
        // Note: In a real app we would compare full dates, but we are using mock data with "Day Name" string
        // We will fallback to matching Day Name from mock if date matching fails or just rely on Name for now as per legacy code
        return appointments.filter(apt => apt.day === dayName)
    }

    // Layout algorithm for overlapping events
    const getLayoutAttributes = (appointments: Appointment[]) => {
        // 1. Sort by start time, then duration (desc)
        const sorted = [...appointments].sort((a, b) => {
            const timeA = a.time.split(':').map(Number)
            const timeB = b.time.split(':').map(Number)
            // Fix potential undefined if time is malformed
            const hA = timeA[0] || 0
            const mA = timeA[1] || 0
            const hB = timeB[0] || 0
            const mB = timeB[1] || 0

            if (hA !== hB) return hA - hB
            if (mA !== mB) return mA - mB
            return (b.duration || 60) - (a.duration || 60)
        })

        const columns: Appointment[][] = []
        const lastEventEnding: number[] = []

        const layoutMap = new Map<string, { width: number, left: number }>()

        sorted.forEach(evt => {
            const parts = evt.time.split(':').map(Number)
            const h = parts[0] || 0
            const m = parts[1] || 0
            const start = h * 60 + m
            const duration = evt.duration || 60
            const end = start + duration

            // Find first column where this event fits
            let colIndex = -1
            for (let i = 0; i < lastEventEnding.length; i++) {
                if (start >= lastEventEnding[i]) {
                    colIndex = i
                    break
                }
            }

            if (colIndex !== -1) {
                columns[colIndex].push(evt)
                lastEventEnding[colIndex] = end
            } else {
                columns.push([evt])
                lastEventEnding.push(end)
            }
        })

        // Simple width distribution: 100% / number of columns needed
        // This is a basic greedy approach. For perfect Google Calendar visual,
        // we'd need a more complex graph coloring algorithm, but this is usually sufficient.
        const totalColumns = columns.length
        if (totalColumns > 0) {
            columns.forEach((colEvents, colIndex) => {
                colEvents.forEach(evt => {
                    layoutMap.set(evt.id, {
                        width: 100 / totalColumns,
                        left: (colIndex * 100) / totalColumns
                    })
                })
            })
        }

        return layoutMap
    }

    // Calculate detailed style for an event
    const getDetailedEventStyle = (apt: Appointment, layout?: { width: number, left: number }) => {
        const timeParts = apt.time.split(':').map(Number)
        const h = timeParts[0] || 0
        const m = timeParts[1] || 0
        // Relative to startHour
        const startOffset = (h - startHour) * 60 + m
        // Height based on duration (default 60m)
        const duration = apt.duration || 60

        return {
            top: `${startOffset}px`,
            height: `${duration}px`,
            left: layout ? `${layout.left}%` : '2px', // use calculated left %
            width: layout ? `${layout.width}%` : 'calc(100% - 4px)', // use calculated width %
            backgroundColor: apt.status === 'blocked' ? '#e0e0e0' : undefined,
            color: apt.status === 'blocked' ? '#666' : undefined,
            borderColor: apt.status === 'blocked' ? '#ccc' : undefined,
            cursor: apt.status === 'blocked' ? 'default' : 'pointer',
            zIndex: layout ? 2 : undefined // ensure events are above grid
        }
    }

    return (
        <div className="week-view">
            <div className="week-header">
                <div className="header-time-spacer"></div>
                {weekDates.map((date, i) => (
                    <div key={i} className={`day-column-header ${isToday(date) ? 'today' : ''}`}>
                        <span className="day-name">{(weekDays[i] || '').substring(0, 3)}</span>
                        <span className="day-number">{date.getDate()}</span>
                    </div>
                ))}
            </div>

            <div className="week-body">
                {/* Time Labels Column */}
                <div className="time-column">
                    {displayHours.map(h => (
                        <div key={h} className="time-slot-label" style={{ height: '60px' }}>
                            <span>{h.toString().padStart(2, '0')}:00</span>
                        </div>
                    ))}
                </div>

                {/* Day Columns */}
                {weekDates.map((date, i) => {
                    const dayAppointments = getAppointmentsForDay(date)
                    const layoutMap = getLayoutAttributes(dayAppointments)

                    return (
                        <div key={i} className="day-column">
                            {/* Render Slots (for clicking and dropping) */}
                            <div className="day-slots-container">
                                {displayHours.map(h => (
                                    <div
                                        key={h}
                                        className="hour-slot"
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, date, h)}
                                        onClick={() => onSlotClick(date, `${h.toString().padStart(2, '0')}:00`)}
                                    ></div>
                                ))}
                            </div>

                            {/* Render Events */}
                            {dayAppointments.map(apt => (
                                <div
                                    key={apt.id}
                                    className="calendar-event"
                                    style={getDetailedEventStyle(apt, layoutMap.get(apt.id))}
                                    draggable={apt.status !== 'blocked'}
                                    onDragStart={(e) => handleDragStart(e, apt.id)}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onEventClick(apt)
                                    }}
                                >
                                    <span className="event-time">{apt.time}</span>
                                    <span className="event-title">
                                        {apt.status === 'blocked' ? 'Bloqueado' : apt.client}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WeekView
