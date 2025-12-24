import React from 'react'
import './Input.css'

interface InputProps {
    label?: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    error?: string
}

function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error = ''
}: InputProps) {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`input-field ${error ? 'input-error' : ''}`}
                aria-label={label}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default Input
