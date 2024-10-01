'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
    Box,
    CssBaseline,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Chip,
} from '@mui/material';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import axios from 'axios';

const drawerWidth = 240; // Ancho del sidebar cuando está desplegado
const collapsedDrawerWidth = 60; // Ancho del sidebar cuando está colapsado

export default function DynamicTables() {
    const router = useRouter();
    const [tables, setTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [selectedTableData, setSelectedTableData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [error, setError] = useState(null);

    // Función para cargar las tablas
    const fetchTables = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/database/list/tables`);
            setTables(response.data || []);
        } catch (error) {
            console.error('Error al obtener las tablas:', error);
            setError('No se pudieron cargar las tablas.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTable = (event) => {
        setSelectedTables(event.target.value);
    };

    const fetchAllTableData = useCallback(async (newPage = 0) => {
        if (!selectedTables.length) return;

        setLoading(true);
        const newTableData = { ...selectedTables };

        for (const table of selectedTables) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/database/${table}?page=${newPage}&size=10`);
                if (response.data) {
                    newTableData[table] = {
                        columns: response.data.columns,
                        rows: response.data.rows,
                        pageSize: response.data.pageSize,
                        totalRows: response.data.totalRows,
                        currentPage: newPage,
                    };
                }
            } catch (error) {
                console.error(`Error fetching data for table ${table}:`, error);
                setError(`Error al obtener datos de ${table}.`);
            }
        }

        setSelectedTableData(newTableData);
        setLoading(false);
    }, [selectedTables]);

    useEffect(() => {
        fetchTables();
    }, []);

    const handleDataTransferClick = () => {
        router.push('/data-transfer'); // Redirige al nuevo canvas para la transferencia de datos
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                onMouseEnter={() => setIsDrawerOpen(true)}
                onMouseLeave={() => setIsDrawerOpen(false)}
                sx={{
                    width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
                        boxSizing: 'border-box',
                        transition: 'width 0.3s ease',
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {isDrawerOpen ? 'Sidebar' : ''}
                    </Typography>
                </Toolbar>
                <List>
                    <ListItem button onClick={handleDataTransferClick}>
                        <ListItemIcon>
                            <TransferWithinAStationIcon />
                        </ListItemIcon>
                        {isDrawerOpen && <ListItemText primary="Data Transfer Pro" />}
                    </ListItem>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Container maxWidth="lg">
                    {error && <Alert severity="error">{error}</Alert>}
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            {tables.length > 0 && (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="select-table-label">Select Tables</InputLabel>
                                    <Select
                                        labelId="select-table-label"
                                        multiple
                                        value={selectedTables}
                                        onChange={handleSelectTable}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} sx={{ m: 0.5 }} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {tables.map((table) => (
                                            <MenuItem key={table} value={table}>
                                                {table}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}

                            {/* Render data tables here based on selectedTableData */}
                            {Object.keys(selectedTableData).map((tableName) => (
                                <TableContainer component={Paper} key={tableName} sx={{ mt: 4 }}>
                                    <Typography variant="h6">{tableName}</Typography>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {selectedTableData[tableName].columns.map((column) => (
                                                    <TableCell key={column}>{column}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedTableData[tableName].rows.map((row, rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                    {Object.values(row).map((value, colIndex) => (
                                                        <TableCell key={colIndex}>{value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={selectedTableData[tableName].totalRows}
                                        rowsPerPage={selectedTableData[tableName].pageSize}
                                        page={selectedTableData[tableName].currentPage}
                                        onPageChange={(event, newPage) => fetchAllTableData(newPage)}
                                    />
                                </TableContainer>
                            ))}
                        </>
                    )}
                </Container>
            </Box>
        </Box>
    );
}
