import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import UserFlow from './pages/UserFlow'
import AdminFlow from './pages/AdminFlow'
import './App.css'

/**
 * App Component with React Router
 * Routes:
 * - / → Redirect to /usuario
 * - /usuario → User booking flow
 * - /admin → Admin dashboard
 */
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/usuario" replace />} />
                    <Route path="/usuario/*" element={<UserFlow />} />
                    <Route path="/admin/*" element={<AdminFlow />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
