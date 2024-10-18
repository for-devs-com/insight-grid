import { useState, useEffect } from 'react'

interface Activity {
    id: string
    type: 'connection' | 'query' | 'report'
    description: string
    timestamp: string
}

export function RecentActivities() {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        // Simular la obtención de datos de la API
        const fetchData = async () => {
            // Aquí iría la llamada real a la API
            const mockData: Activity[] = [
                { id: '1', type: 'connection', description: 'Conexión establecida con Database A', timestamp: '10:30 AM' },
                { id: '2', type: 'query', description: 'Consulta ejecutada en Grid 1', timestamp: '10:45 AM' },
                { id: '3', type: 'report', description: 'Reporte generado para Cliente X', timestamp: '11:00 AM' },
                { id: '4', type: 'connection', description: 'Conexión establecida con Database B', timestamp: '11:15 AM' },
                { id: '5', type: 'query', description: 'Consulta ejecutada en Grid 2', timestamp: '11:30 AM' },
            ]
            setActivities(mockData)
        }

        fetchData()
        // Configurar un intervalo para actualizar los datos periódicamente
        const interval = setInterval(fetchData, 30000) // Actualizar cada 30 segundos

        return () => clearInterval(interval)
    }, [])

    return (
        <ul className="space-y-2">
            {activities.map((activity) => (
                <li key={activity.id} className="flex justify-between items-start">
                    <div>
                        <span className="font-medium">{activity.description}</span>
                        <br />
                        <span className="text-sm text-gray-500">{activity.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </li>
            ))}
        </ul>
    )
}