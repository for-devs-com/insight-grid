import React, { memo, useContext } from 'react';
import { Handle, NodeResizeControl, Position } from '@xyflow/react';
import DatabaseConnectionForm from '../DatabaseConnectionForm';
import DynamicTables from '@/components/DynamicTables';
import { FormStateContext } from "@/store/form-state-provider";

const DatabaseConnectionNode = ({ id, data }) => {
    console.log('Rendering DatabaseConnectionNode:', id);
    const formStateContext = useContext(FormStateContext);
    if (!formStateContext) {
        throw new Error("DatabaseConnectionNode must be used within a FormStateProvider");
    }
    const { isConnected } = formStateContext;

    return (
        <div
            className="flex-1"
            style={{ padding: 10, border: '1px solid #ccc', borderRadius: 5 }}
        >
            {!isConnected ? (
                <DatabaseConnectionForm />
            ) : (
                <div>
                    {/* Renderiza el explorador del esquema de la base de datos */}
                    <DynamicTables />
                    <p>Database Schema Explorer by for-devs.com</p>
                </div>
            )}
            <NodeResizeControl style={{ background: 'transparent', border: 'none' }} minWidth={100} minHeight={50}>
                <ResizeIcon />
            </NodeResizeControl>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

function areEqual(prevProps, nextProps) {
    // Solo re-renderizar si 'isConnected' o 'id' cambian
    return (
        prevProps.data.isConnected === nextProps.data.isConnected &&
        prevProps.id === nextProps.id
    );
}

export default memo(DatabaseConnectionNode, areEqual);

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
export { ResizeIcon };
