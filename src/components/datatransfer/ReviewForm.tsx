'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Database,
    Globe,
    Hash,
    Server,
    User,
} from 'lucide-react'
interface DatabaseConfig {
    databaseType: string
    host: string
    port: number
    databaseName: string
    userName: string
    [key: string]: string | number
}

interface ReviewFormProps {
    sourceConfig: DatabaseConfig
    destConfig: DatabaseConfig
    onSubmit: () => void
    loading: boolean
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
                                                          sourceConfig,
                                                          destConfig,
                                                          onSubmit,
                                                          loading,
                                                      }) => {
    const renderDatabaseInfo = (config: DatabaseConfig, title: string) => (
        <div className="bg-card p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    {/* Tipo de Base de Datos */}
                    <div className="flex items-center mb-4">
                        <div className="mr-2 text-primary">
                            <Database className="w-5 h-5" />
                        </div>
                        <div className="font-bold mr-2 min-w-[80px]">Type:</div>
                        <div className="flex-1">
              <span className="px-2 py-1 text-sm border border-primary text-primary rounded">
                {config.databaseType}
              </span>
                        </div>
                    </div>
                    {/* Host */}
                    <div className="flex items-center mb-4">
                        <div className="mr-2 text-primary">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div className="font-bold mr-2 min-w-[80px]">Host:</div>
                        <div className="flex-1">{config.host}</div>
                    </div>
                    {/* Puerto */}
                    <div className="flex items-center mb-4">
                        <div className="mr-2 text-primary">
                            <Hash className="w-5 h-5" />
                        </div>
                        <div className="font-bold mr-2 min-w-[80px]">Port:</div>
                        <div className="flex-1">{config.port}</div>
                    </div>
                </div>
                <div>
                    {/* Nombre de la Base de Datos */}
                    <div className="flex items-center mb-4">
                        <div className="mr-2 text-primary">
                            <Server className="w-5 h-5" />
                        </div>
                        <div className="font-bold mr-2 min-w-[80px]">Database:</div>
                        <div className="flex-1">{config.databaseName || 'N/A'}</div>
                    </div>
                    {/* Usuario */}
                    <div className="flex items-center mb-4">
                        <div className="mr-2 text-primary">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="font-bold mr-2 min-w-[80px]">User:</div>
                        <div className="flex-1">{config.userName}</div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                {renderDatabaseInfo(sourceConfig, 'Source Database')}
                {renderDatabaseInfo(destConfig, 'Destination Database')}

                <div className="mt-6">
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className={`w-full py-3 text-lg font-medium rounded-2xl transition-colors duration-200 ${
                            loading
                                ? 'bg-muted cursor-not-allowed text-muted-foreground'
                                : 'bg-primary text-primary-foreground hover:bg-primary-dark'
                        }`}
                    >
                        {loading ? 'Transferring...' : 'Start Transfer'}
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="w-3/5 h-2 bg-muted rounded relative overflow-hidden">
                            <div className="absolute left-0 top-0 h-full bg-success animate-progress"></div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ReviewForm
