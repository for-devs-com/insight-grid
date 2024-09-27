import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Grid {
    id: string
    name: string
    creationDate: string
    rowCount: number
}

export function RecentGrids() {
    const [grids, setGrids] = useState<Grid[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    useEffect(() => {
        // Simular la obtención de datos de la API
        const fetchData = async () => {
            // Aquí iría la llamada real a la API
            const mockData: Grid[] = Array.from({ length: 20 }, (_, i) => ({
                id: `${i + 1}`,
                name: `Grid ${i + 1}`,
                creationDate: new Date(Date.now() - i * 86400000).toLocaleDateString(),
                rowCount: Math.floor(Math.random() * 10000)
            }))
            setGrids(mockData)
        }

        fetchData()
    }, [])

    const pageCount = Math.ceil(grids.length / itemsPerPage)
    const displayedGrids = grids.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre del Grid</TableHead>
                        <TableHead>Fecha de Creación</TableHead>
                        <TableHead>Número de Filas</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedGrids.map((grid) => (
                        <TableRow key={grid.id}>
                            <TableCell>{grid.name}</TableCell>
                            <TableCell>{grid.creationDate}</TableCell>
                            <TableCell>{grid.rowCount.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </Button>
                <span>Página {currentPage} de {pageCount}</span>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                    disabled={currentPage === pageCount}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}