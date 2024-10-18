import { useReducer, useCallback } from 'react'

interface DatabaseConfig {
    databaseType: string
    host: string
    port: number | null
    databaseName: string
    userName: string
    password: string
    sid?: string
    instance?: string
}

type State = {
    sourceConfig: DatabaseConfig
    destConfig: DatabaseConfig
    loading: boolean
    error: string | null
}

type Action =
    | { type: 'UPDATE_CONFIG'; payload: { type: 'source' | 'destination'; name: string; value: string } }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }

const initialState: State = {
    sourceConfig: {
        databaseType: '',
        host: '',
        port: null,
        databaseName: '',
        userName: '',
        password: '',
    },
    destConfig: {
        databaseType: '',
        host: '',
        port: null,
        databaseName: '',
        userName: '',
        password: '',
    },
    loading: false,
    error: null,
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'UPDATE_CONFIG':
            const configKey = action.payload.type === 'source' ? 'sourceConfig' : 'destConfig'
            return {
                ...state,
                [configKey]: {
                    ...state[configKey],
                    [action.payload.name]: action.payload.value,
                },
            }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        default:
            return state
    }
}

export const useDatabaseTransfer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleConfigChange = useCallback(
        (type: 'source' | 'destination') => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = event.target
            dispatch({ type: 'UPDATE_CONFIG', payload: { type, name, value } })
        },
        []
    )

    const handleDatabaseTypeChange = useCallback(
        (type: 'source' | 'destination') => (event: React.ChangeEvent<HTMLSelectElement>) => {
            const newDatabaseType = event.target.value
            const defaultPort = databaseManagers.find(db => db.value === newDatabaseType)?.defaultPort || 0
            dispatch({
                type: 'UPDATE_CONFIG',
                payload: { type, name: 'databaseType', value: newDatabaseType },
            })
            dispatch({
                type: 'UPDATE_CONFIG',
                payload: { type, name: 'port', value: defaultPort.toString() },
            })
            // Reset specific fields
            if (newDatabaseType !== 'oracle') {
                dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { type, name: 'sid', value: '' },
                })
            }
            if (newDatabaseType !== 'sqlserver') {
                dispatch({
                    type: 'UPDATE_CONFIG',
                    payload: { type, name: 'instance', value: '' },
                })
            }
        },
        []
    )

    const testConnection = useCallback(
        async (type: 'source' | 'destination') => {
            dispatch({ type: 'SET_LOADING', payload: true })
            dispatch({ type: 'SET_ERROR', payload: null })

            // Validar el formulario
            const config = type === 'source' ? state.sourceConfig : state.destConfig

            if (!config.databaseType || !config.host || !config.port || !config.databaseName || !config.userName || !config.password) {
                dispatch({ type: 'SET_ERROR', payload: 'Please fill in all required fields.' })
                dispatch({ type: 'SET_LOADING', payload: false })
                return
            }
            if (config.databaseType === 'oracle' && !config.sid) {
                dispatch({ type: 'SET_ERROR', payload: 'Please provide the SID for Oracle.' })
                dispatch({ type: 'SET_LOADING', payload: false })
                return
            }
            if (config.databaseType === 'sqlserver' && !config.instance) {
                dispatch({ type: 'SET_ERROR', payload: 'Please provide the Instance Name for SQL Server.' })
                dispatch({ type: 'SET_LOADING', payload: false })
                return
            }

            try {
                // Simular llamada API para probar la conexión
                await new Promise((resolve) => setTimeout(resolve, 1000))
                // Aquí puedes implementar la lógica para probar la conexión real

                // En caso de éxito, puedes actualizar el estado si es necesario
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: 'Unable to connect to the server. Please check your internet connection.' })
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        },
        [state.sourceConfig, state.destConfig]
    )

    return {
        ...state,
        handleConfigChange,
        handleDatabaseTypeChange,
        testConnection,
    }
}

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL', defaultPort: 5432 },
    { value: 'mysql', label: 'MySQL', defaultPort: 3306 },
    { value: 'sqlserver', label: 'SQL Server', defaultPort: 1433 },
    { value: 'oracle', label: 'Oracle', defaultPort: 1521 },
]
