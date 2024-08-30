'use client';

import React, {useEffect, useState} from 'react';
import {Handle, NodeResizeControl, NodeResizer, Position} from '@xyflow/react';
import DatabaseConnectionForm from '../DatabaseConnectionForm';
import DynamicTables from "@/components/DynamicTables";
import useCanvasStore from "@/store/useCanvasStore";

const DatabaseConnectionNode = ({id}) => {
    /*const [isConnected, setIsConnected] = useState(false);*/
    const isConnected = useCanvasStore((state) => state.nodes.find((node) => node.id === id)?.data?.isConnected || false);
    const setNodeData = useCanvasStore((state) => state.setNodeData);

    const controlStyle = {
        background: 'transparent',
        border: 'none',
    };

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
        <div className={"flex-1"} style={{padding: 10, border: '1px solid #ccc', borderRadius: 5, background: '#f8fafc'}}>
            {!isConnected ? (
                <DatabaseConnectionForm onConnectionSuccess={handleConnectionSuccess}/>
            ) : (
                <div>
                    {/* Renderiza el explorador del esquema de la base de datos */}
                    <DynamicTables/>
                    <p>Database Schema Explorer for-devs.com</p>
                </div>
            )}
            <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
                <ResizeIcon />
            </NodeResizeControl>
            <Handle type="target" position={Position.Top}/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
};

export default DatabaseConnectionNode;


function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#ff0071"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}
export {ResizeIcon};