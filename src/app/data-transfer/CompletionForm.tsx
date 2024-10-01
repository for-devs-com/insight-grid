import React from 'react'
import { Typography, Button, Paper } from '@mui/material'
import { motion } from 'framer-motion'

interface CompletionFormProps {
    onReset: () => void
}

export const CompletionForm: React.FC<CompletionFormProps> = ({ onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Transfer Complete
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onReset}
                    fullWidth
                >
                    Start New Transfer
                </Button>
            </Paper>
        </motion.div>
    )
}

export default CompletionForm