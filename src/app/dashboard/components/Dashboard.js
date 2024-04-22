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
    const [tableData, setTableData] = useState({columns: [], rows: [], page: 0, totalCount: 0});
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/listTables`)
            .then(response => setTables(response.data))
            .catch(error => console.error('Error al obtener las tablas:', error));
    }, [apiUrl]);

    useEffect(() => {
        if (selectedTable) {
            fetchTableData(selectedTable);
        }
    }, [selectedTable, apiUrl]);

    const fetchTableData = (tableName, pageNum = 0) => {
        Promise.all([
            axios.get(`${apiUrl}/api/columns/${tableName}`),
            axios.get(`${apiUrl}/api/data/${tableName}?page=${pageNum}&size=10`)
        ])
            .then(([columnsResponse, rowsResponse]) => {
                setTableData({
                    columns: columnsResponse.data,
                    rows: rowsResponse.data.data,
                    page: rowsResponse.data.currentPage,
                    totalCount: rowsResponse.data.totalRows,
                });
                console.log('Datos de la tabla', tableName, 'obtenidos:', rowsResponse.data);
            })
            .catch(error => console.error(`Error al obtener datos para la tabla ${tableName}:`, error));
    };

    const handleSelectTable = (event) => {
        setSelectedTable(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        fetchTableData(selectedTable, newPage);
    };

    return <Container maxWidth="lg">
        <FormControl fullWidth margin="normal">
            <InputLabel id="table-select-label">Tablas</InputLabel>
            <Select
                labelId="table-select-label"
                id="table-select"
                value={selectedTable}
                onChange={handleSelectTable}
            >
                {tables.map(table => (
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
                                {tableData.columns.map((column, colIndex) => (
                                    <TableCell key={`header-${column.columnName}-${colIndex}`}>
                                {column.columnName}
                            </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.rows.map((row, rowIndex) => (
                                <TableRow key={`row-${rowIndex}`}>
                                    {tableData.columns.map((column, colIndex) => (
                                        <TableCell key={`cell-${column.columnName}-${rowIndex}-${colIndex}`}>
                                            {row[column.columnName]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={tableData.totalCount}
                    rowsPerPage={10}
                    page={tableData.page}
                    onPageChange={handleChangePage}
                />
            </React.Fragment>
        )}
    </Container>

}
