import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'
import DashboardView from '../components/admin/DashboardView'
import ServicesView from '../components/admin/ServicesView'
import TeamView from '../components/admin/TeamView'

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
                <Route path="team" element={<TeamView />} />
            </Route>
        </Routes>
    )
}

export default AdminFlow
