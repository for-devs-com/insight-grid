'use client'

import React, { useState } from 'react'
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material'
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm'

export default function DataTransferPage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<'success' | 'error'>('success')
    const [connections, setConnections] = useState({ input: false, output: false })

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const onConnectionSuccess = (type: 'input' | 'output') => {
        setConnections(prev => ({ ...prev, [type]: true }))
    }

    const startTransfer = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${apiUrl}/api/database/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await response.json()

            if (response.ok && data.success) {
                setSeverity('success')
                setMessage('Data transfer completed successfully.')
            } else {
                throw new Error(data.message || 'Transfer failed')
            }
        } catch (error) {
            setSeverity('error')
            setMessage(`Data transfer failed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => setMessage('')

    return (
        <Container maxWidth="md">
            <Card sx={{ mt: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Data Transfer Pro
                    </Typography>
                    <DatabaseConnectionForm
                        onConnectionSuccess={() => onConnectionSuccess('input')}
                        title="Source Database"
                    />
                    <DatabaseConnectionForm
                        onConnectionSuccess={() => onConnectionSuccess('output')}
                        title="Destination Database"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={startTransfer}
                        disabled={!connections.input || !connections.output || loading}
                        startIcon={loading && <CircularProgress size={20} color="inherit" />}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {loading ? 'Transferring...' : 'Start Transfer'}
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={!!message}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}