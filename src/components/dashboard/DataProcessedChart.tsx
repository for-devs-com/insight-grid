import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
    name: string
    value: number
}

export function DataProcessedChart() {
    const [data, setData] = useState<DataPoint[]>([])

    useEffect(() => {
        // Simular la obtención de datos de la API
        const fetchData = async () => {
            // Aquí iría la llamada real a la API
            const mockData: DataPoint[] = [
                { name: '00:00', value: 4000 },
                { name: '04:00', value: 3000 },
                { name: '08:00', value: 2000 },
                { name: '12:00', value: 2780 },
                { name: '16:00', value: 1890 },
                { name: '20:00', value: 2390 },
            ]
            setData(mockData)
        }

        fetchData()
    }, [])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}