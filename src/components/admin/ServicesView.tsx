import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import './ServicesView.css'

interface ServiceData {
    id: string
    name: string
    professionals: string[]
    duration: number
    price: number
}

// Mock data
const initialServices: ServiceData[] = [
    {
        id: '1',
        name: 'Corte de Cabello',
        professionals: ['María González', 'Ana Rodríguez'],
        duration: 60,
        price: 100
    },
    {
        id: '2',
        name: 'Coloración',
        professionals: ['María González', 'Sofia López'],
        duration: 120,
        price: 200
    },
    {
        id: '3',
        name: 'Manicura',
        professionals: ['Laura Martínez'],
        duration: 45,
        price: 80
    },
    {
        id: '4',
        name: 'Tratamiento Facial',
        professionals: ['Laura Martínez', 'Sofia López'],
        duration: 90,
        price: 150
    },
    {
        id: '5',
        name: 'Masaje',
        professionals: ['Ana Rodríguez', 'Sofia López'],
        duration: 60,
        price: 120
    }
]

const availableProfessionals = [
    'María González',
    'Laura Martínez',
    'Ana Rodríguez',
    'Sofia López'
]

function ServicesView() {
    const [services, setServices] = useState<ServiceData[]>(initialServices)
    const [showModal, setShowModal] = useState(false)
    const [newService, setNewService] = useState({
        name: '',
        professionals: [] as string[],
        duration: '',
        price: ''
    })

    const handleAddService = () => {
        if (!newService.name || newService.professionals.length === 0 || !newService.duration || !newService.price) {
            alert('Por favor completa todos los campos')
            return
        }

        const service: ServiceData = {
            id: Date.now().toString(),
            name: newService.name,
            professionals: newService.professionals,
            duration: parseInt(newService.duration),
            price: parseFloat(newService.price)
        }

        setServices([...services, service])
        setShowModal(false)
        setNewService({ name: '', professionals: [], duration: '', price: '' })
    }

    const toggleProfessional = (professional: string) => {
        if (newService.professionals.includes(professional)) {
            setNewService({
                ...newService,
                professionals: newService.professionals.filter(p => p !== professional)
            })
        } else {
            setNewService({
                ...newService,
                professionals: [...newService.professionals, professional]
            })
        }
    }

    return (
        <div className="services-view">
            {/* Header */}
            <div className="services-header">
                <h2 className="section-title">Listado de Servicios</h2>
                <Button onClick={() => setShowModal(true)} variant="primary">
                    + Servicio
                </Button>
            </div>

            {/* Services Table */}
            <div className="services-table-container">
                <table className="services-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Profesionales</th>
                            <th>Duración</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td className="service-name">{service.name}</td>
                                <td className="service-professionals">
                                    {service.professionals.map((prof, index) => (
                                        <span key={index} className="professional-pill">
                                            {prof}
                                        </span>
                                    ))}
                                </td>
                                <td className="service-duration">{service.duration} min</td>
                                <td className="service-price">${service.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Service Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Agregar Servicio</h3>

                        <div className="modal-form">
                            <Input
                                label="Nombre del servicio"
                                type="text"
                                value={newService.name}
                                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                placeholder="Ej: Corte de Cabello"
                            />

                            <div className="form-group">
                                <label className="form-label">Profesional(es)</label>
                                <div className="professionals-checkboxes">
                                    {availableProfessionals.map((prof) => (
                                        <label key={prof} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={newService.professionals.includes(prof)}
                                                onChange={() => toggleProfessional(prof)}
                                            />
                                            <span>{prof}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Input
                                label="Duración (min)"
                                type="number"
                                value={newService.duration}
                                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                                placeholder="60"
                            />

                            <Input
                                label="Precio ($)"
                                type="number"
                                value={newService.price}
                                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                placeholder="100"
                            />

                            <div className="modal-actions">
                                <Button onClick={handleAddService} variant="primary">
                                    Agregar
                                </Button>
                                <Button onClick={() => setShowModal(false)} variant="secondary">
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ServicesView
