import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function DynamicTables() {
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

    const fetchAllTableData = useCallback(async (newPage = 0) => {
        if (!selectedTables.length) return;

        setLoading(true);
        const newTableData = { ...selectedTables };

        for (const table of selectedTables) {
            try {
                const response = await axios.get(`${apiUrl}/api/data/${table}?page=${newPage}&size=10`);
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
            }
        }

        setSelectedTableData(newTableData);
        setLoading(false);
    }, [selectedTables, apiUrl]);

    useEffect(() => {
        fetchAllTableData();
    }, [fetchAllTableData]);

    const handleSelectTable = (event) => {
        setSelectedTables(Array.from(event.target.selectedOptions, option => option.value));
    };

    const handleChangePage = async (_event, tableName, newPage) => {
        setLoading(true);
        await fetchAllTableData(newPage, tableName);
        setLoading(false);
    };

    if (loading) {
        return <div>Loading...</div>; // TODO: reemplazar esto con un componente de carga
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <label htmlFor="table-select" className="block text-gray-700">Tablas</label>
                <select
                    id="table-select"
                    multiple
                    value={selectedTables}
                    onChange={handleSelectTable}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    {tables.map((table) => (
                        <option key={table} value={table}>{table}</option>
                    ))}
                </select>
            </div>

            {selectedTables.map((tableName) => (
                <React.Fragment key={tableName}>
                    {selectedTableData[tableName] ? (
                        <div className="overflow-auto mb-4 border border-gray-300 rounded-md">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-200">
                                <tr>
                                    {selectedTableData[tableName].columns.map((column) => (
                                        <th key={column.COLUMN_NAME} className="px-4 py-2 border-b border-gray-200">
                                            {column.COLUMN_NAME?.replace('_', ' ').toUpperCase() || "N/A"}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {selectedTableData[tableName].rows.map((row, rowIndex) => (
                                    <tr key={`row-${row.id}`}>
                                        {selectedTableData[tableName].columns.map((column) => (
                                            <td key={`cell-${column.COLUMN_NAME}-${rowIndex}`} className="px-4 py-2 border-b border-gray-200">
                                                {row[column.COLUMN_NAME]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {selectedTableData[tableName].rows.length === 0 && (
                                    <tr>
                                        <td colSpan={selectedTableData[tableName].columns.length} className="px-4 py-2 text-center">
                                            No data
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center p-4">
                                <button
                                    onClick={() => handleChangePage(null, tableName, selectedTableData[tableName].currentPage - 1)}
                                    disabled={selectedTableData[tableName].currentPage === 0}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {selectedTableData[tableName].currentPage + 1} of {Math.ceil(selectedTableData[tableName].totalRows / selectedTableData[tableName].pageSize)}
                                </span>
                                <button
                                    onClick={() => handleChangePage(null, tableName, selectedTableData[tableName].currentPage + 1)}
                                    disabled={(selectedTableData[tableName].currentPage + 1) * selectedTableData[tableName].pageSize >= selectedTableData[tableName].totalRows}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>No data</div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
