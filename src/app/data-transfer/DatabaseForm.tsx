import React from 'react'
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material'
import { Database, Server, User, Key } from 'lucide-react'
import { motion } from 'framer-motion'

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL', defaultPort: 5432 },
    { value: 'mysql', label: 'MySQL', defaultPort: 3306 },
    { value: 'sqlserver', label: 'SQL Server', defaultPort: 1433 },
    { value: 'oracle', label: 'Oracle', defaultPort: 1521 },
]

interface DatabaseConfig {
    databaseType: string
    host: string
    port: number
    databaseName: string
    userName: string
    password: string
    [key: string]: string | number
}

interface DatabaseFormProps {
    type: 'source' | 'destination'
    config: DatabaseConfig
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    loading: boolean
    error: string | null
}

export const DatabaseForm: React.FC<DatabaseFormProps> = ({
                                                              type,
                                                              config,
                                                              onChange,
                                                              onTypeChange,
                                                              onSubmit,
                                                              loading,
                                                              error
                                                          }) => {
    const renderDatabaseSpecificFields = () => {
        switch (config.databaseType) {
            case 'oracle':
                return (
                    <TextField
                        margin="normal"
                        fullWidth
                        name="sid"
                        label="SID"
                        value={config.sid || ''}
                        onChange={onChange}
                    />
                )
            case 'sqlserver':
                return (
                    <TextField
                        margin="normal"
                        fullWidth
                        name="instance"
                        label="Instance Name"
                        value={config.instance || ''}
                        onChange={onChange}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Connect to {type === 'source' ? 'Source' : 'Destination'} Database
                    </Typography>
                    <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); onSubmit(); }} sx={{ mt: 3 }}>
                        <TextField
                            select
                            margin="normal"
                            fullWidth
                            id={`${type}DatabaseType`}
                            label="Database Manager"
                            name="databaseType"
                            value={config.databaseType}
                            onChange={onTypeChange}
                            InputProps={{
                                startAdornment: <Database size={20} style={{ marginRight: 8 }} />,
                            }}
                        >
                            {databaseManagers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            fullWidth
                            id={`${type}Host`}
                            label="Host"
                            name="host"
                            value={config.host}
                            onChange={onChange}
                            InputProps={{
                                startAdornment: <Server size={20} style={{ marginRight: 8 }} />,
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="port"
                            label="Port"
                            id={`${type}Port`}
                            type="number"
                            value={config.port}
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id={`${type}DatabaseName`}
                            label="Database Name"
                            name="databaseName"
                            value={config.databaseName}
                            onChange={onChange}
                        />
                        {renderDatabaseSpecificFields()}
                        <TextField
                            margin="normal"
                            fullWidth
                            id={`${type}UserName`}
                            label="User"
                            name="userName"
                            value={config.userName}
                            onChange={onChange}
                            InputProps={{
                                startAdornment: <User size={20} style={{ marginRight: 8 }} />,
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id={`${type}Password`}
                            value={config.password}
                            onChange={onChange}
                            InputProps={{
                                startAdornment: <Key size={20} style={{ marginRight: 8 }} />,
                            }}
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Connect'}
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    )
}

export default DatabaseForm