import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './Login.css'

function Login() {
    const [showSignUp, setShowSignUp] = useState<boolean>(false)
    const { login } = useAuthContext()

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="business-name">LULI GUGLI Spa</h1>
                <p className="business-tagline">Reserva tu turno</p>

                {showSignUp ? (
                    <SignUp
                        onSwitchToSignIn={() => setShowSignUp(false)}
                        onSignUp={login}
                    />
                ) : (
                    <SignIn
                        onSwitchToSignUp={() => setShowSignUp(true)}
                        onSignIn={login}
                    />
                )}
            </div>
        </div>
    )
}

export default Login
