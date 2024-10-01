import { useReducer, useCallback } from 'react'

interface DatabaseConfig {
    databaseType: string
    host: string
    port: number
    databaseName: string
    userName: string
    password: string
    [key: string]: string | number
}

type State = {
    activeStep: number
    sourceConfig: DatabaseConfig
    destConfig: DatabaseConfig
    loading: boolean
    error: string | null
}

type Action =
    | { type: 'SET_ACTIVE_STEP'; payload: number }
    | { type: 'UPDATE_CONFIG'; payload: { type: 'source' | 'dest'; config: Partial<DatabaseConfig> } }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }

const initialState: State = {
    activeStep: 0,
    sourceConfig: {
        databaseType: 'postgresql',
        host: 'localhost',
        port: 5432,
        databaseName: '',
        userName: '',
        password: '',
    },
    destConfig: {
        databaseType: 'mysql',
        host: 'localhost',
        port: 3306,
        databaseName: '',
        userName: '',
        password: '',
    },
    loading: false,
    error: null,
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_ACTIVE_STEP':
            return { ...state, activeStep: action.payload }
        case 'UPDATE_CONFIG':
            return {
                ...state,
                [action.payload.type === 'source' ? 'sourceConfig' : 'destConfig']: {
                    ...state[action.payload.type === 'source' ? 'sourceConfig' : 'destConfig'],
                    ...action.payload.config,
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

    const handleConfigChange = useCallback((type: 'source' | 'dest') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        dispatch({ type: 'UPDATE_CONFIG', payload: { type, config: { [name]: value } } })
    }, [])

    const handleDatabaseTypeChange = useCallback((type: 'source' | 'dest') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDatabaseType = event.target.value
        const defaultPort = databaseManagers.find(db => db.value === newDatabaseType)?.defaultPort || 0
        dispatch({
            type: 'UPDATE_CONFIG',
            payload: { type, config: { databaseType: newDatabaseType, port: defaultPort } },
        })
    }, [])

    const testConnection = useCallback(async (type: 'source' | 'dest') => {
        dispatch({ type: 'SET_LOADING', payload: true })
        dispatch({ type: 'SET_ERROR', payload: null })
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch({ type: 'SET_LOADING', payload: false })
        if (type === 'source' && state.activeStep === 0) {
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 })
        } else if (type === 'dest' && state.activeStep === 1) {
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 })
        }
    }, [state.activeStep])

    const startTransfer = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true })
        dispatch({ type: 'SET_ERROR', payload: null })
        // Simulating transfer process
        await new Promise(resolve => setTimeout(resolve, 2000))
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'SET_ACTIVE_STEP', payload: 3 })
    }, [])

    const resetTransfer = useCallback(() => {
        dispatch({ type: 'SET_ACTIVE_STEP', payload: 0 })
    }, [])

    return {
        ...state,
        handleConfigChange,
        handleDatabaseTypeChange,
        testConnection,
        startTransfer,
        resetTransfer,
    }
}

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL', defaultPort: 5432 },
    { value: 'mysql', label: 'MySQL', defaultPort: 3306 },
    { value: 'sqlserver', label: 'SQL Server', defaultPort: 1433 },
    { value: 'oracle', label: 'Oracle', defaultPort: 1521 },
]