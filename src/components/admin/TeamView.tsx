import React, { useState } from 'react'
import { Professional } from '../../types/booking'
import { professionals as initialProfessionalsData } from '../../data/mockData'
import ProfessionalModal from './team/ProfessionalModal'
import './ServicesView.css' // Reusing the same styles for consistency

function TeamView() {
    const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionalsData)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null)

    const handleNewProfessional = () => {
        setEditingProfessional(null)
        setIsModalOpen(true)
    }

    const handleEditProfessional = (prof: Professional) => {
        setEditingProfessional(prof)
        setIsModalOpen(true)
    }

    const handleDeleteProfessional = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este profesional?')) {
            setProfessionals(prev => prev.filter(p => p.id !== id))
        }
    }

    const handleSaveProfessional = (profData: Omit<Professional, 'id'>) => {
        if (editingProfessional) {
            // Update
            setProfessionals(prev => prev.map(p =>
                p.id === editingProfessional.id
                    ? { ...profData, id: editingProfessional.id }
                    : p
            ))
        } else {
            // Create
            const newProfessional: Professional = {
                id: Date.now().toString(),
                ...profData
            }
            setProfessionals(prev => [...prev, newProfessional])
        }
    }

    return (
        <div className="services-view">
            <div className="services-header-row">
                <h2 className="section-title">Listado de Profesionales</h2>
                <button className="btn-primary" onClick={handleNewProfessional}>
                    + Nuevo Profesional
                </button>
            </div>

            <div className="services-table-section">
                <div className="services-table-container">
                    <table className="services-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Especialidades</th>
                                <th style={{ width: '100px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professionals.map(prof => (
                                <tr key={prof.id}>
                                    <td className="service-name-cell">{prof.name}</td>
                                    <td>
                                        <div className="professionals-list">
                                            {prof.specialties.map((specialty, idx) => (
                                                <span key={idx} className="pro-tag">{specialty}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            className="btn-icon"
                                            title="Editar"
                                            onClick={() => handleEditProfessional(prof)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon delete"
                                            title="Eliminar"
                                            onClick={() => handleDeleteProfessional(prof.id)}
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

            <ProfessionalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProfessional}
                initialData={editingProfessional}
            />
        </div>
    )
}

export default TeamView
