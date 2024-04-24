"use client";
import React, {useState, useEffect} from 'react';
import {
    Container,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import axios from 'axios';

export default function Dashboard() {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState({
        rows: [],
        columns: [],
        pageSize: 10,
        totalRows: 0,
        currentPage: 0
    });
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchTables = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/listTables`);
                setTables(response.data || []);
                console.log('Tables:', response.data);
            } catch (error) {
                console.error('Error al obtener las tablas:', error);
            } finally {
                setLoading(false);
            }
        };

        if (apiUrl) fetchTables();
    }, [apiUrl]);

    useEffect(() => {
        if (selectedTable) {
            fetchTableData(selectedTable);
        }
    }, [selectedTable, apiUrl]);

    const fetchTableData = async (tableName, pageNum = 0) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/data/${tableName}?page=${pageNum}&size=10`)
            console.log('Table data:', response.data);
            if (response.data ) {
                setTableData({
                    columns: response.data.columns,
                    currentPage: pageNum,
                    pageSize: response.data.pageSize,
                    rows: response.data.rows,
                    totalRows: response.data.totalRows,
                    tableName: tableName,
                });
            } else {
                // Manejar el caso en que la estructura no es la esperada
                console.error('Unexpected response structure:', response);
            }
        } catch (error) {
            console.error(`Error fetching data for table ${tableName}:`, error) ;
        } finally {
            setLoading(false);
        }
    };
    const handleSelectTable = (event) => {
        setSelectedTable(event.target.value);
        setTableData({
            rows: [],
            columns: [],
            pageSize: 10,
            totalRows: 0,
            currentPage: 0,
        });
    };

    const handleChangePage = (event, newPage) => {
        fetchTableData(selectedTable, newPage * tableData.pageSize);
    };
    if (loading) {
        return <div>Loading...</div>; // TODO: reemplazar esto con un componente de carga
    }


    return <Container maxWidth="lg">
        <FormControl fullWidth margin="normal">
            <InputLabel id="table-select-label">Tablas</InputLabel>
            <Select
                labelId="table-select-label"
                id="table-select"
                value={selectedTable}
                onChange={handleSelectTable}
            >
                {tables.map((table) => (
                    <MenuItem key={table} value={table}>{table}</MenuItem>
                ))}
            </Select>
        </FormControl>

        {selectedTable && (
            <React.Fragment>
                <TableContainer component={Paper} sx={{marginTop: 4}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {tableData.columns.map((column) => (
                                    <TableCell key={column.COLUMN_NAME}>
                                        {column.COLUMN_NAME?.replace('_', ' ').toUpperCase() || "N/A"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.rows.map((row) => (
                                <TableRow key={`row-${row.id}`}>
                                    {tableData.columns.map((column) => (
                                        <TableCell key={`cell-${column.COLUMN_NAME}-${row.id}`}>
                                            {row[column.COLUMN_NAME]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            {tableData.rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={tableData.columns.length} align="center">
                                        No data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={tableData.totalRows}
                    rowsPerPage={tableData.pageSize}
                    page={tableData.currentPage}
                    onPageChange={(event, newPage) => handleChangePage(event, newPage)}
                />
            </React.Fragment>
        )}
    </Container>
};