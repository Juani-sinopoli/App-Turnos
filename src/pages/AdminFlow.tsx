import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'
import DashboardView from '../components/admin/DashboardView'
import ServicesView from '../components/admin/ServicesView'

/**
 * Admin Flow - Management interface for business owners
 * Routes: /admin
 */
function AdminFlow() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardView />} />
                <Route path="services" element={<ServicesView />} />
                <Route path="team" element={<div style={{ padding: '2rem' }}>Equipo View - En construcción</div>} />
            </Route>
        </Routes>
    )
}

export default AdminFlow
