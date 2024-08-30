import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DatabaseConnectionForm({ onConnectionSuccess }) {
    const router = useRouter();

    useEffect(() => {
        if (!router) return;
        console.log('Database Connection Form mounted');
    }, [router]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [error, setError] = useState(null);
    const [databaseType, setDatabaseType] = useState('postgresql');
    const [host, setHost] = useState('localhost');
    const [port, setPort] = useState('5432');
    const [databaseName, setDatabaseName] = useState('for-devs-university');
    const [userName, setUserName] = useState('postgres');
    const [password, setPassword] = useState('qwerty');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const connectionData = {
            databaseType: databaseType,
            host,
            port: port,
            databaseName,
            userName,
            password
        };
        try {
            const response = await fetch(`${apiUrl}/api/database/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(connectionData)
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
        }
    };


    return (
        <div className="container mx-auto max-w-xs p-4">
            <div className="mt-8 flex flex-col items-center">
                <h1 className=" font-bold">Database Connection Form</h1>
                <form className="w-full mt-4" noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="databaseManager" className="block text-gray-700">Database Manager</label>
                        <input
                            type="text"
                            id="databaseManager"
                            name="databaseManager"
                            value={databaseType}
                            onChange={(e) => setDatabaseType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="host" className="block text-gray-700">Host</label>
                        <input
                            type="text"
                            id="host"
                            name="host"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="port" className="block text-gray-700">Port</label>
                        <input
                            type="number"
                            id="port"
                            name="port"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="databaseName" className="block text-gray-700">Database Name</label>
                        <input
                            type="text"
                            id="databaseName"
                            name="databaseName"
                            value={databaseName}
                            onChange={(e) => setDatabaseName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user" className="block text-gray-700">User</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Connect
                    </button>
                </form>
            </div>
        </div>
    );
}
