// DataTransferComponent.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import DatabaseConnectionForm from '@/components/DatabaseConnectionForm'
import { useDatabaseTransfer } from '@/components/datatransfer/useDatabaseTransfer'

interface DataTransferComponentProps {
    type: 'source' | 'destination'
}

const DataTransferComponent: React.FC<DataTransferComponentProps> = ({ type }) => {
    const {
        sourceConfig,
        destConfig,
        handleConfigChange,
        handleDatabaseTypeChange,
        testConnection,
        loading,
        error,
    } = useDatabaseTransfer()

    const config = type === 'source' ? sourceConfig : destConfig
    const handleChange = handleConfigChange(type)
    const handleTypeChange = handleDatabaseTypeChange(type)
    const onTestConnection = () => testConnection(type)

    return (
        <div className="mt-4">
            <DatabaseConnectionForm
                type={type}
                config={config}
                onChange={handleChange}
                onTypeChange={handleTypeChange}
                onSubmit={onTestConnection}
                loading={loading}
                error={error}
            />
        </div>
    )
}

export default DataTransferComponent
