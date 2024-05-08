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
    OutlinedInput,
    Chip,
} from '@mui/material';
import axios from 'axios';

export default function Dashboard() {
    const [tables, setTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [selectedTableData, setSelectedTableData] = useState({});
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


    // Carga de datos para las tablas seleccionadas
    useEffect(() => {
        const fetchAllTableData = async () => {
            if (!selectedTables.length) return; // Exit if no tables are selected

            setLoading(true);
            const newTableData = {};

            for (const tableName of selectedTables) {
                try {
                    const response = await axios.get(`${apiUrl}/api/data/${tableName}?page=0&size=10`);
                    if (response.data) {
                        newTableData[tableName] = {
                            columns: response.data.columns,
                            rows: response.data.rows,
                            pageSize: response.data.pageSize,
                            totalRows: response.data.totalRows,
                            currentPage: 0,
                        };
                    }
                } catch (error) {
                    console.error(`Error fetching data for table ${tableName}:`, error);
                }
            }

            setSelectedTableData(newTableData);
            setLoading(false);
        };

        fetchAllTableData();
    }, [selectedTables, apiUrl]);

    const handleSelectTable = (event) => {
        setSelectedTables(event.target.value);
    };

    const handleChangePage = async (tableName, newPage) => {
        setLoading(true);
        fetchAllTableData(newPage).then(() => {
            const updatedData = {
                ...selectedTableData,
                [tableName]: {
                    ...selectedTableData[tableName],
                    currentPage: newPage,
                },
            };
            setSelectedTableData(updatedData);
        });
    };
    if (loading) {
        return <div>Loading...</div>; // TODO: reemplazar esto con un componente de carga
    }


    return (<Container maxWidth="lg">
            <FormControl fullWidth margin="normal">
                <InputLabel id="table-select-label">Tablas</InputLabel>
                <Select
                    labelId="table-select-label"
                    id="table-select"
                    multiple
                    value={selectedTables}
                    onChange={handleSelectTable}
                    input={<OutlinedInput id="select-multiple-chip" label="Tablas"/>}
                    renderValue={(selected) => (<div>
                        {selected.map((value) => (<Chip key={value} label={value}/>))}
                    </div>)}
                >
                    {tables.map((table) => (<MenuItem key={table} value={table}>{table}</MenuItem>))}
                </Select>
            </FormControl>

            {selectedTables.map((tableName) => (
                <React.Fragment key={tableName}>
                    {selectedTableData[tableName] ? (
                        <TableContainer component={Paper} sx={{marginTop: 4}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {selectedTableData[tableName].columns.map((column) => (
                                            <TableCell key={column.COLUMN_NAME}>
                                                {column.COLUMN_NAME?.replace('_', ' ').toUpperCase() || "N/A"}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedTableData[tableName].rows.map((row, rowIndex) => (
                                        <TableRow key={`row-${row.id}`}>
                                            {selectedTableData[tableName].columns.map((column) => (
                                                <TableCell key={`cell-${column.COLUMN_NAME}-${rowIndex}`}>
                                                    {row[column.COLUMN_NAME]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {selectedTableData[tableName].rows.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={selectedTableData[tableName].columns.length}
                                                       align="center">
                                                No data
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            < TablePagination
                                component="div"
                                count={selectedTables[tableName]?.totalRows || 0}
                                rowsPerPage={selectedTables[tableName]?.pageSize|| 10}
                                page={selectedTables[tableName]?.currentPage || 0}
                                onPageChange={(event, newPage) => handleChangePage(event, newPage)}
                            />
                        </TableContainer>

                    ) : (
                        <div>No data</div>
                    )}
                </React.Fragment>
            ))}


        </Container>
    )
};