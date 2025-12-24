import { useState, FormEvent } from 'react'
import Input from './Input'
import Button from './Button'
import './SignIn.css'

interface SignInProps {
    onSwitchToSignUp: () => void
    onSignIn: () => void
}

function SignIn({ onSwitchToSignUp, onSignIn }: SignInProps) {
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Sign in with phone:', phone, 'email:', email)
        // TODO: Integrate with backend API
        onSignIn()
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="business-tagline">Reserva tu turno</p>
                <h2 className="modal-title">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="+54 9 11 1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary">
                        Agendar turno
                    </Button>
                </form>
                <p className="modal-footer">
                    ¿No tienes cuenta?{' '}
                    <button onClick={onSwitchToSignUp} className="link-button">
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SignIn
