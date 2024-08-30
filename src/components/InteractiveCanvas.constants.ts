import { AppNode } from "@/lib/types";
import { Edge } from "@xyflow/react";
import DatabaseConnectionNode from "@/components/nodes/DatabaseConnectionNode";
import InputNode from "@/components/nodes/InputNode";


const position = { x: Math.random() * 250, y: Math.random() * 250 };
export const initialEdges: Edge[] = [];

export const initialNodes: AppNode[] = [
    {
        id: '1',
        type: 'databaseConnection',
        position,
        data: { label: 'Database Connection' },
    },
    {
        id: '2',
        type: 'inputNode',
        position,
        data: { label: 'Input' },
    },
];

export const nodeTypes = {
    databaseConnection: DatabaseConnectionNode,
    inputNode: InputNode,
};
