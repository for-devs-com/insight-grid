'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
} from "@mui/material"
import { DatabaseIcon, ServerIcon, UserIcon, KeyIcon } from 'lucide-react'

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'sqlserver', label: 'SQL Server' },
]

export default function DatabaseConnectionForm({ onConnectionSuccess }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        databaseManager: 'postgresql',
        host: 'localhost',
        port: 5432,
        databaseName: 'for-devs-university',
        user: 'postgres',
        password: '',
    })

    useEffect(() => {
        if (!router.isReady) return
        console.log('Database Connection Form mounted')
    }, [router.isReady])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/connect-database`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                onConnectionSuccess()
            } else {
                const errorMsg = await response.text()
                setError(`Connection failed: ${errorMsg}`)
            }
        } catch (error) {
            console.error('Error connecting to the database', error)
            setError('Error connecting to the database')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Connect to Database
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        id="databaseManager"
                        label="Database Manager"
                        name="databaseManager"
                        value={formData.databaseManager}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <DatabaseIcon size={20} style={{ marginRight: 8 }} />,
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
                        id="host"
                        label="Host"
                        name="host"
                        value={formData.host}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <ServerIcon size={20} style={{ marginRight: 8 }} />,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="port"
                        label="Port"
                        id="port"
                        type="number"
                        value={formData.port}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="databaseName"
                        label="Database Name"
                        name="databaseName"
                        value={formData.databaseName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="user"
                        label="User"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <UserIcon size={20} style={{ marginRight: 8 }} />,
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: <KeyIcon size={20} style={{ marginRight: 8 }} />,
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
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Connect'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}