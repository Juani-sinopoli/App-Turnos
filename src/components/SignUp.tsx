import { useState, FormEvent } from 'react'
import Input from './Input'
import Button from './Button'
import './SignUp.css'

interface SignUpProps {
    onSwitchToSignIn: () => void
    onSignUp: () => void
}

interface FormData {
    phone: string
    firstName: string
    lastName: string
    email: string
}

function SignUp({ onSwitchToSignIn, onSignUp }: SignUpProps) {
    const [formData, setFormData] = useState<FormData>({
        phone: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Sign up with data:', formData)
        // TODO: Integrate with backend API
        onSignUp()
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Crear Cuenta</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="+54 9 11 1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                    />

                    <Input
                        label="Nombre"
                        type="text"
                        placeholder="Juan"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                    />

                    <Input
                        label="Apellido"
                        type="text"
                        placeholder="Pérez"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="juan@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />

                    <Button type="submit" variant="primary">
                        Ingresar
                    </Button>
                </form>

                <p className="modal-footer">
                    ¿Ya tienes cuenta?{' '}
                    <button onClick={onSwitchToSignIn} className="link-button">
                        Inicia sesión
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SignUp
