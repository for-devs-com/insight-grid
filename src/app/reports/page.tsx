'use client';
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockTransferData = [
    { id: 1, source: 'MySQL', destination: 'PostgreSQL', records: 5000, date: '2023-09-15' },
    { id: 2, source: 'CSV', destination: 'MongoDB', records: 10000, date: '2023-09-16' },
    { id: 3, source: 'API', destination: 'Elasticsearch', records: 7500, date: '2023-09-17' },
    { id: 4, source: 'Oracle', destination: 'BigQuery', records: 15000, date: '2023-09-18' },
    { id: 5, source: 'S3', destination: 'Redshift', records: 20000, date: '2023-09-19' },
]

const mockChartData = [
    { name: 'MySQL', transfers: 12 },
    { name: 'PostgreSQL', transfers: 19 },
    { name: 'MongoDB', transfers: 7 },
    { name: 'Elasticsearch', transfers: 5 },
    { name: 'BigQuery', transfers: 10 },
]

export default function DataReports() {
    const [dateRange, setDateRange] = useState('7d')
    const [sourceFilter, setSourceFilter] = useState('')

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Reportes de Transferencia de Datos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="dateRange">Rango de Fechas</Label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger id="dateRange">
                                    <SelectValue placeholder="Selecciona un rango" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="sourceFilter">Fuente de Datos</Label>
                            <Select value={sourceFilter} onValueChange={setSourceFilter}>
                                <SelectTrigger id="sourceFilter">
                                    <SelectValue placeholder="Todas las fuentes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="allSources">Todas las fuentes</SelectItem>
                                    <SelectItem value="MySQL">MySQL</SelectItem>
                                    <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Resumen de Transferencias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">52,500</div>
                        <p className="text-muted-foreground">Registros transferidos en total</p>
                        <div className="mt-4">
                            <div className="text-2xl font-semibold">5</div>
                            <p className="text-muted-foreground">Transferencias completadas</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Gráfico de Transferencias por Fuente</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="transfers" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Transferencias</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Fuente</TableHead>
                                <TableHead>Destino</TableHead>
                                <TableHead>Registros</TableHead>
                                <TableHead>Fecha</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTransferData.map((transfer) => (
                                <TableRow key={transfer.id}>
                                    <TableCell>{transfer.id}</TableCell>
                                    <TableCell>{transfer.source}</TableCell>
                                    <TableCell>{transfer.destination}</TableCell>
                                    <TableCell>{transfer.records.toLocaleString()}</TableCell>
                                    <TableCell>{transfer.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-end">
                        <Button>Exportar Reporte</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}