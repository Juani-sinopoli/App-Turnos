import React from 'react'
import './CalendarHeader.css'

export type CalendarViewType = 'day' | 'week' | 'month'

interface CalendarHeaderProps {
    currentDate: Date
    view: CalendarViewType
    onViewChange: (view: CalendarViewType) => void
    onPrev: () => void
    onNext: () => void
    onToday: () => void
}

function CalendarHeader({ currentDate, view, onViewChange, onPrev, onNext, onToday }: CalendarHeaderProps) {

    // Format date based on view
    const getFormattedDate = () => {
        const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
        if (view === 'day') {
            options.day = 'numeric'
        }
        return currentDate.toLocaleDateString('es-ES', options)
    }

    return (
        <div className="calendar-header-container">
            <div className="calendar-nav-group">
                <button className="nav-btn" onClick={onToday}>Hoy</button>
                <div className="nav-buttons">
                    <button className="nav-btn" onClick={onPrev}>&lt;</button>
                    <button className="nav-btn" onClick={onNext}>&gt;</button>
                </div>
                <span className="current-date-label">
                    {getFormattedDate().charAt(0).toUpperCase() + getFormattedDate().slice(1)}
                </span>
            </div>

            <div className="view-switcher">
                <button
                    className={`view-btn ${view === 'day' ? 'active' : ''}`}
                    onClick={() => onViewChange('day')}
                >
                    Día
                </button>
                <button
                    className={`view-btn ${view === 'week' ? 'active' : ''}`}
                    onClick={() => onViewChange('week')}
                >
                    Semana
                </button>
                <button
                    className={`view-btn ${view === 'month' ? 'active' : ''}`}
                    onClick={() => onViewChange('month')}
                >
                    Mes
                </button>
            </div>
        </div>
    )
}

export default CalendarHeader
