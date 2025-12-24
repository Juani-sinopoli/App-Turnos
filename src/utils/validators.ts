/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): boolean => {
    // Basic validation: at least 8 digits
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 8
}

/**
 * Validate name (non-empty, letters only)
 */
export const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
