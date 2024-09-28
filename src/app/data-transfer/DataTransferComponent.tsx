'use client'

import React from 'react'
import {
    Container,
    Typography,
    Stepper,
    Step,
    StepLabel,
    useMediaQuery,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import DatabaseForm from '@/app/data-transfer/DatabaseForm'
import { ReviewForm } from '@/app/data-transfer/ReviewForm'
import { CompletionForm } from '@/app/data-transfer/CompletionForm'
import { useDatabaseTransfer } from '@/app/data-transfer/useDatabaseTransfer'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#0f2b46' },
        background: { default: '#0f2b46', paper: '#1a3a5a' },
        text: { primary: '#ffffff', secondary: '#b0bec5' },
    },
    components: {
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    color: '#1a3a5a',
                    '&.Mui-active': {
                        color: '#ffffff',
                    },
                    '&.Mui-completed': {
                        color: '#4caf50',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                },
            },
        },
    },
})

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .MuiStepLabel-label': {
        fontSize: '0.875rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem',
        },
        fontWeight: 500,
        color: theme.palette.text.secondary,
        '&.Mui-active': {
            color: theme.palette.primary.contrastText,
        },
        '&.Mui-completed': {
            color: theme.palette.success.main,
        },
    },
}))

const AnimatedContainer = motion(Box)

const DataTransferComponent: React.FC = () => {
    const {
        activeStep,
        sourceConfig,
        destConfig,
        loading,
        error,
        handleConfigChange,
        handleDatabaseTypeChange,
        testConnection,
        startTransfer,
        resetTransfer,
    } = useDatabaseTransfer()
    useMediaQuery(theme.breakpoints.down('sm'));
    const steps = ['Source', 'Destination', 'Review', 'Complete']

    const renderStepContent = (step: number) => {
        const content = (() => {
            switch (step) {
                case 0:
                    return (
                        <DatabaseForm
                            type="source"
                            config={sourceConfig}
                            onChange={handleConfigChange('source')}
                            onTypeChange={handleDatabaseTypeChange('source')}
                            onSubmit={() => testConnection('source')}
                            loading={loading}
                            error={error}
                        />
                    )
                case 1:
                    return (
                        <DatabaseForm
                            type="destination"
                            config={destConfig}
                            onChange={handleConfigChange('dest')}
                            onTypeChange={handleDatabaseTypeChange('dest')}
                            onSubmit={() => testConnection('dest')}
                            loading={loading}
                            error={error}
                        />
                    )
                case 2:
                    return (
                        <ReviewForm
                            sourceConfig={sourceConfig}
                            destConfig={destConfig}
                            onSubmit={startTransfer}
                            loading={loading}
                        />
                    )
                case 3:
                    return <CompletionForm onReset={resetTransfer} />
                default:
                    return null
            }
        })()

        return (
            <AnimatePresence mode="wait">
                <AnimatedContainer
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {content}
                </AnimatedContainer>
            </AnimatePresence>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ pt: 8, pb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h5" component="h1" gutterBottom color="text.primary" align="center">
                        Database Transfer
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <CustomStepLabel>{label}</CustomStepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </motion.div>
                <Box sx={{ mt: 4 }}>
                    {renderStepContent(activeStep)}
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default DataTransferComponent