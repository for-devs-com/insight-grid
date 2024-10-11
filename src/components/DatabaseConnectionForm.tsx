import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, User, Key } from 'lucide-react';
import { FormStateContext } from '@/store/form-state-provider';

interface DatabaseConnectionFormProps {
    onConnectionSuccess: () => void;
}

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL', defaultPort: 5432 },
    { value: 'mysql', label: 'MySQL', defaultPort: 3306 },
    { value: 'sqlserver', label: 'SQL Server', defaultPort: 1433 },
    { value: 'oracle', label: 'Oracle', defaultPort: 1521 },
];

const DatabaseConnectionForm: React.FC<DatabaseConnectionFormProps> = ({ onConnectionSuccess }) => {
    console.log('Rendering DatabaseConnectionForm');
    const { formState, setFormState } = useContext(FormStateContext);

    if (!formState || !setFormState) {
        throw new Error('FormStateContext must be used within a FormStateProvider');
    }

    const apiUrl = process.env.NEXT_PUBLIC_QUERY_BRIDGE_API_URL;

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: name === 'port' ? (value === '' ? '' : Number(value)) : value,
        }));
    };

    const handleDatabaseTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDatabaseType = event.target.value;
        const defaultPort = databaseManagers.find((db) => db.value === newDatabaseType)?.defaultPort || '';
        setFormState((prevFormState) => ({
            ...prevFormState,
            databaseType: newDatabaseType,
            port: defaultPort,
            // Resetear campos específicos
            sid: newDatabaseType === 'oracle' ? '' : undefined,
            instance: newDatabaseType === 'sqlserver' ? '' : undefined,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const connectionData = {
            databaseType: formState.databaseType,
            host: formState.host,
            port: formState.port,
            databaseName: formState.databaseName,
            userName: formState.userName,
            password: formState.password,
            sid: formState.sid,
            instance: formState.instance,
        };

        try {
            const response = await fetch(`${apiUrl}/query/bridge/database/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connectionData),
            });
            if (response.ok) {
                onConnectionSuccess();
            } else {
                const errorMsg = await response.text();
                setError(`Conexión fallida: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Error al conectar con la base de datos', error);
            setError('Error al conectar con la base de datos');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ icon: Icon, ...props }) => (
        <div
            className="mb-4 flex items-center border rounded-md px-2"
            onKeyDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
        >
            <Icon className="text-gray-400 mr-2" />
            <input
                {...props}
                className="w-full py-2 outline-none bg-transparent"
                data-no-drag
                data-no-pan
            />
        </div>
    );

    const renderDatabaseSpecificFields = () => {
        if (formState.databaseType === 'oracle') {
            return (
                <InputField
                    icon={Database}
                    type="text"
                    id="sid"
                    name="sid"
                    value={formState.sid || ''}
                    onChange={handleChange}
                    placeholder="SID"
                    required
                />
            );
        } else if (formState.databaseType === 'sqlserver') {
            return (
                <InputField
                    icon={Database}
                    type="text"
                    id="instance"
                    name="instance"
                    value={formState.instance || ''}
                    onChange={handleChange}
                    placeholder="Instance Name"
                    required
                />
            );
        }
        return null;
    };

    return (
        <div className="container mx-auto max-w-md p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mt-4">
                    <h2 className="font-bold text-xl mb-4 text-center">
                        Database Connection
                    </h2>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div
                            className="mb-4"
                            onKeyDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <label htmlFor="databaseManager" className="block text-gray-700 mb-1">
                                Database Manager
                            </label>
                            <select
                                id="databaseManager"
                                name="databaseType"
                                value={formState.databaseType}
                                onChange={handleDatabaseTypeChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            >
                                <option value="" disabled>
                                    Select a Database Manager
                                </option>
                                {databaseManagers.map((manager) => (
                                    <option key={manager.value} value={manager.value}>
                                        {manager.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputField
                            icon={Server}
                            type="text"
                            id="host"
                            name="host"
                            value={formState.host}
                            onChange={handleChange}
                            placeholder="Host"
                            required
                        />
                        <InputField
                            icon={Database}
                            type="number"
                            id="port"
                            name="port"
                            value={formState.port}
                            onChange={handleChange}
                            placeholder="Port"
                            required
                        />
                        <InputField
                            icon={Database}
                            type="text"
                            id="databaseName"
                            name="databaseName"
                            value={formState.databaseName}
                            onChange={handleChange}
                            placeholder="Database Name"
                            required
                        />
                        {renderDatabaseSpecificFields()}
                        <InputField
                            icon={User}
                            type="text"
                            id="userName"
                            name="userName"
                            value={formState.userName}
                            onChange={handleChange}
                            placeholder="User"
                            required
                        />
                        <InputField
                            icon={Key}
                            type="password"
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        {error && (
                            <div className="text-red-500 text-sm mb-4">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded ${
                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                            } flex items-center justify-center transition-colors duration-200`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            ) : (
                                'Connect'
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default React.memo(DatabaseConnectionForm);