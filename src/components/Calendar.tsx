import { useCalendar } from '../hooks/useCalendar'
import { isSameDay, isPastDate } from '../utils/dateHelpers'
import { MONTH_NAMES, DAY_NAMES } from '../constants/booking.constants'
import './Calendar.css'

interface CalendarProps {
    selectedDate: Date | null
    onSelectDate: (date: Date) => void
}

function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
    const { currentMonth, days, previousMonth, nextMonth } = useCalendar()

    return (
        <div className="calendar">
            <div className="calendar-booking-header">
                <button onClick={previousMonth} className="calendar-nav">
                    ←
                </button>
                <h4 className="calendar-month">
                    {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <button onClick={nextMonth} className="calendar-nav">
                    →
                </button>
            </div>

            <div className="calendar-booking-grid">
                {DAY_NAMES.map((day) => (
                    <div key={day} className="calendar-day-name">
                        {day}
                    </div>
                ))}
                {days.map((date, index) => {
                    const isPlaceholder = date.getTime() === 0
                    const isPast = !isPlaceholder && isPastDate(date)
                    const isSelected = !isPlaceholder && isSameDay(selectedDate, date)

                    return (
                        <button
                            key={index}
                            onClick={() => !isPlaceholder && !isPast && onSelectDate(date)}
                            disabled={isPlaceholder || isPast}
                            className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''
                                } ${isPlaceholder ? 'placeholder' : ''}`}
                        >
                            {!isPlaceholder && date.getDate()}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar
