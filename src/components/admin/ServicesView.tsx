import React, { useState } from 'react'
import ServiceModal from './services/ServiceModal'
import './ServicesView.css'

interface ServiceData {
    id: string
    name: string
    professionals: string[]
    duration: number
    price: number
}

// Initial Mock data
const initialServices: ServiceData[] = [
    { id: '1', name: 'Corte de Cabello', professionals: ['María González', 'Ana Rodríguez'], duration: 60, price: 100 },
    { id: '2', name: 'Coloración', professionals: ['María González', 'Sofia López'], duration: 120, price: 200 },
    { id: '3', name: 'Manicura', professionals: ['Laura Martínez'], duration: 45, price: 80 },
    { id: '4', name: 'Tratamiento Facial', professionals: ['Laura Martínez', 'Sofia López'], duration: 90, price: 150 },
    { id: '5', name: 'Masaje', professionals: ['Ana Rodríguez', 'Sofia López'], duration: 60, price: 120 }
]

function ServicesView() {
    const [services, setServices] = useState<ServiceData[]>(initialServices)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingService, setEditingService] = useState<ServiceData | null>(null)

    const handleNewService = () => {
        setEditingService(null)
        setIsModalOpen(true)
    }

    const handleEditService = (service: ServiceData) => {
        setEditingService(service)
        setIsModalOpen(true)
    }

    const handleDeleteService = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            setServices(prev => prev.filter(s => s.id !== id))
        }
    }

    const handleSaveService = (serviceData: Omit<ServiceData, 'id'>) => {
        if (editingService) {
            // Update
            setServices(prev => prev.map(s =>
                s.id === editingService.id
                    ? { ...serviceData, id: editingService.id }
                    : s
            ))
        } else {
            // Create
            const newService: ServiceData = {
                id: Date.now().toString(),
                ...serviceData
            }
            setServices(prev => [...prev, newService])
        }
    }

    return (
        <div className="services-view">
            <div className="services-header-row">
                <h2 className="section-title">Listado de Servicios</h2>
                <button className="btn-primary" onClick={handleNewService}>
                    + Nuevo Servicio
                </button>
            </div>

            <div className="services-table-section">
                <div className="services-table-container">
                    <table className="services-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th style={{ width: '40%' }}>Profesionales</th>
                                <th>Duración</th>
                                <th>Precio</th>
                                <th style={{ width: '100px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td className="service-name-cell">{service.name}</td>
                                    <td>
                                        <div className="professionals-list">
                                            {service.professionals.map((prof, idx) => (
                                                <span key={idx} className="pro-tag">{prof}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="duration-tag">{service.duration} min</span>
                                    </td>
                                    <td className="price-cell">${service.price}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="btn-icon"
                                            title="Editar"
                                            onClick={() => handleEditService(service)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon delete"
                                            title="Eliminar"
                                            onClick={() => handleDeleteService(service.id)}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveService}
                initialData={editingService}
            />
        </div>
    )
}

export default ServicesView
