import React from 'react'
import './Button.css'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
        >
            {children}
        </button>
    )
}

export default Button
