

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, User, Key } from 'lucide-react';

interface DatabaseConnectionFormProps {
    onConnectionSuccess: () => void;
}

const databaseManagers = [
    { value: 'postgresql', label: 'PostgreSQL', defaultPort: 5432 },
    { value: 'mysql', label: 'MySQL', defaultPort: 3306 },
    { value: 'sqlserver', label: 'SQL Server', defaultPort: 1433 },
    { value: 'oracle', label: 'Oracle', defaultPort: 1521 },
];

export default function DatabaseConnectionForm({ onConnectionSuccess }: DatabaseConnectionFormProps) {
    const queryBridgeApiUrl = process.env.NEXT_PUBLIC_QUERY_BRIDGE_API_URL;

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [databaseType, setDatabaseType] = useState('');
    const [host, setHost] = useState('localhost');
    const [port, setPort] = useState<number | null>(null);
    const [databaseName, setDatabaseName] = useState('for-devs-university');
    const [userName, setUserName] = useState('postgres');
    const [password, setPassword] = useState('qwerty');
    const [sid, setSid] = useState('');
    const [instance, setInstance] = useState('');

    const validateForm = () => {
        if (!databaseType || !host || !port || !databaseName || !userName || !password) {
            setError('Please fill in all required fields.');
            return false;
        }
        if (databaseType === 'oracle' && !sid) {
            setError('Please provide the SID for Oracle.');
            return false;
        }
        if (databaseType === 'sqlserver' && !instance) {
            setError('Please provide the Instance Name for SQL Server.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!queryBridgeApiUrl) {
            console.error('NEXT_PUBLIC_QUERY_BRIDGE_API_URL is not defined.');
            setError('Configuration error. Please contact the administrator.');
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const connectionData = {
            databaseType,
            host,
            port: Number(port),
            databaseName,
            userName,
            password,
            ...(databaseType === 'oracle' && { sid }),
            ...(databaseType === 'sqlserver' && { instance }),
        };

        try {
            const response = await fetch(`${queryBridgeApiUrl}/query/bridge/database/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(connectionData),
            });

            if (response.ok) {
                onConnectionSuccess();
            } else {
                let errorMessage = 'Unknown error connecting to the database.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('Error parsing error response:', parseError);
                }
                setError(errorMessage);
                console.error('Server response error:', response.status, errorMessage);
            }
        } catch (error) {
            console.error('Error connecting to the database:', error);
            setError('Unable to connect to the server. Please check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderDatabaseSpecificFields = () => {
        if (databaseType === 'oracle') {
            return (
                <InputField
                    icon={Database}
                    type="text"
                    id="sid"
                    name="sid"
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                    placeholder="SID"
                    required
                />
            );
        } else if (databaseType === 'sqlserver') {
            return (
                <InputField
                    icon={Database}
                    type="text"
                    id="instance"
                    name="instance"
                    value={instance}
                    onChange={(e) => setInstance(e.target.value)}
                    placeholder="Instance Name"
                    required
                />
            );
        }
        return null;
    };

    const InputField = ({ icon: Icon, ...props }) => (
        <div className="mb-4 flex items-center border rounded-md px-2">
            <Icon className="text-gray-400 mr-2" />
            <input
                {...props}
                className="w-full py-2 outline-none"
            />
        </div>
    );

    return (
        <div className="container mx-auto max-w-md p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mt-8 flex flex-col items-center">
                    <h1 className="font-bold text-xl mb-4">Database Connection Form</h1>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="databaseManager" className="block text-gray-700">Database Manager</label>
                            <select
                                id="databaseManager"
                                name="databaseManager"
                                value={databaseType}
                                onChange={(e) => {
                                    setDatabaseType(e.target.value);
                                    // Update default port when changing database manager
                                    const selectedManager = databaseManagers.find(manager => manager.value === e.target.value);
                                    setPort(selectedManager ? selectedManager.defaultPort : null);
                                    // Reset specific fields
                                    setSid('');
                                    setInstance('');
                                }}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select a database manager</option>
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
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            placeholder="Host"
                            required
                        />
                        <InputField
                            icon={Database}
                            type="number"
                            id="port"
                            name="port"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="Port"
                            required
                        />
                        <InputField
                            icon={Database}
                            type="text"
                            id="databaseName"
                            name="databaseName"
                            value={databaseName}
                            onChange={(e) => setDatabaseName(e.target.value)}
                            placeholder="Database Name"
                            required
                        />
                        {renderDatabaseSpecificFields()}
                        <InputField
                            icon={User}
                            type="text"
                            id="userName"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="User"
                            required
                        />
                        <InputField
                            icon={Key}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            disabled={isLoading}
                            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            } flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    {/* SVG spinner */}
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                    <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" />
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
}
