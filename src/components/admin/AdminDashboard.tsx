import { Outlet, NavLink } from 'react-router-dom'
import './AdminDashboard.css'

/**
 * Admin Dashboard Layout
 * Sidebar + Content Area with nested routes
 */
function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1 className="admin-logo">LULI GUGLI Spa</h1>
                </div>
                <div className="admin-header-right">
                    <span className="admin-date">{new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            <div className="admin-layout">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <nav className="admin-nav">
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            <span className="nav-icon">📊</span>
                            <span className="nav-text">Resumen</span>
                        </NavLink>
                        <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            <span className="nav-icon">✂️</span>
                            <span className="nav-text">Servicios</span>
                        </NavLink>
                        <NavLink to="/admin/team" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            <span className="nav-icon">👥</span>
                            <span className="nav-text">Equipo</span>
                        </NavLink>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminDashboard
