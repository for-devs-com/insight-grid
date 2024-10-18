import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"

interface Connection {
    id: string
    name: string
    connectionTime: string
}

export function ActiveConnections() {
    const [connections, setConnections] = useState<Connection[]>([])
    const [activeCount, setActiveCount] = useState(0)

    useEffect(() => {
        // Simular la obtención de datos de la API
        const fetchData = async () => {
            // Aquí iría la llamada real a la API
            const mockData: Connection[] = [
                { id: '1', name: 'Database A', connectionTime: '2h 30m' },
                { id: '2', name: 'Database B', connectionTime: '1h 15m' },
                { id: '3', name: 'Database C', connectionTime: '45m' },
            ]
            setConnections(mockData)
            setActiveCount(mockData.length)
        }

        fetchData()
        // Configurar un intervalo para actualizar los datos periódicamente
        const interval = setInterval(fetchData, 60000) // Actualizar cada minuto

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <div className="mb-4">
                <Badge variant="secondary" className="text-lg">
                    {activeCount} Conexiones Activas
                </Badge>
            </div>
            <ul className="space-y-2">
                {connections.map((connection) => (
                    <li key={connection.id} className="flex justify-between items-center">
                        <span>{connection.name}</span>
                        <span className="text-sm text-gray-500">{connection.connectionTime}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}