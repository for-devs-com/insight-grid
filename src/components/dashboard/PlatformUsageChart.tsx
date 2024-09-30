import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
    name: string
    records: number
    queries: number
}

export function PlatformUsageChart() {
    const [data, setData] = useState<DataPoint[]>([])

    useEffect(() => {
        // Simular la obtención de datos de la API
        const fetchData = async () => {
            // Aquí iría la llamada real a la API
            const mockData: DataPoint[] = [
                { name: 'Lun', records: 4000, queries: 2400 },
                { name: 'Mar', records: 3000, queries: 1398 },
                { name: 'Mie', records: 2000, queries: 9800 },
                { name: 'Jue', records: 2780, queries: 3908 },
                { name: 'Vie', records: 1890, queries: 4800 },
                { name: 'Sab', records: 2390, queries: 3800 },
                { name: 'Dom', records: 3490, queries: 4300 },
            ]
            setData(mockData)
        }

        fetchData()
    }, [])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="records" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="queries" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}