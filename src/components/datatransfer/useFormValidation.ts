import { useState, useCallback } from 'react'

type ValidationRules<T> = {
    [K in keyof T]: (value: T[K]) => string | null
}

export const useFormValidation = <T extends Record<string, any>>(initialState: T, validationRules: ValidationRules<T>) => {
    const [formData, setFormData] = useState<T>(initialState)
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

    const validateField = useCallback((name: keyof T, value: T[keyof T]) => {
        const error = validationRules[name](value)
        setErrors(prev => ({ ...prev, [name]: error }))
        return !error
    }, [validationRules])

    const handleChange = useCallback((name: keyof T, value: T[keyof T]) => {
        setFormData(prev => ({ ...prev, [name]: value }))
        validateField(name, value)
    }, [validateField])

    const validateForm = useCallback(() => {
        const newErrors: Partial<Record<keyof T, string>> = {}
        let isValid = true

        Object.keys(validationRules).forEach((key) => {
            const error = validationRules[key as keyof T](formData[key as keyof T])
            if (error) {
                newErrors[key as keyof T] = error
                isValid = false
            }
        })

        setErrors(newErrors)
        return isValid
    }, [formData, validationRules])

    return { formData, errors, handleChange, validateForm, validateField }
}