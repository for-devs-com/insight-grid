'use client';

import React, {useEffect, useState} from 'react';
import {Handle, Position} from '@xyflow/react';
import DatabaseConnectionForm from '../DatabaseConnectionForm';
import DynamicTables from "@/components/DynamicTables";
import useCanvasStore from "@/store/useCanvasStore";

const DatabaseConnectionNode = ({id}) => {
    /*const [isConnected, setIsConnected] = useState(false);*/
    const isConnected = useCanvasStore((state) => state.nodes.find((node) => node.id === id)?.data?.isConnected || false);
    const setNodeData = useCanvasStore((state) => state.setNodeData);

    const handleConnectionSuccess = () => {
        /*setIsConnected(true);*/
        setNodeData(id, {isConnected: true});
        // Actualiza el estado del nodo para mostrar el explorador del esquema
    };

    useEffect(() => {
        console.log('isConnected:', isConnected);
        if (!isConnected) {
            setNodeData(id, {isConnected: false});
        }
    },[id, isConnected, setNodeData]);

    return (
        <div style={{padding: 10, border: '1px solid #ccc', borderRadius: 5, background: '#f8fafc'}}>
            {!isConnected ? (
                <DatabaseConnectionForm onConnectionSuccess={handleConnectionSuccess}/>
            ) : (
                <div>
                    {/* Renderiza el explorador del esquema de la base de datos */}
                    <DynamicTables/>
                    <p>Database Schema Explorer</p>
                </div>
            )}
            <Handle type="target" position={Position.Top}/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
};

export default DatabaseConnectionNode;
