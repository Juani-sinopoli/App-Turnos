import { Service } from '../types/booking'
import { generateTimeSlots, getAvailableProfessionals } from '../data/mockData'
import './TimeSlotPicker.css'

interface TimeSlotPickerProps {
    selectedService: Service | null
    selectedDate: Date | null
    selectedTime: string | null
    onSelectTime: (time: string) => void
}

function TimeSlotPicker({
    selectedService,
    selectedDate,
    selectedTime,
    onSelectTime
}: TimeSlotPickerProps) {
    if (!selectedService || !selectedDate) {
        return null
    }

    const timeSlots = generateTimeSlots()

    const isSlotAvailable = (time: string): boolean => {
        if (!selectedService || !selectedDate) return false
        const availablePros = getAvailableProfessionals(selectedService, selectedDate, time)
        return availablePros.length > 0
    }

    return (
        <div className="time-slot-picker">
            <div className="time-slots-grid">
                {timeSlots.map((time) => {
                    const available = isSlotAvailable(time)
                    const isSelected = selectedTime === time

                    return (
                        <button
                            key={time}
                            onClick={() => available && onSelectTime(time)}
                            disabled={!available}
                            className={`time-slot ${isSelected ? 'selected' : ''} ${!available ? 'unavailable' : ''
                                }`}
                        >
                            {time}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default TimeSlotPicker
