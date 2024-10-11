'use client'

import React from 'react'
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
            <div className="mt-8 p-6 rounded-2xl shadow-lg bg-card">
                <h2 className="text-2xl font-semibold mb-6">Transfer Complete</h2>
                <button
                    onClick={onReset}
                    className="w-full py-3 text-lg font-medium rounded-2xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                    Start New Transfer
                </button>
            </div>
        </motion.div>
    )
}

export default CompletionForm
