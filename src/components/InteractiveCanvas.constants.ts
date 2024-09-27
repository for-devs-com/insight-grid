import { AppNode } from "@/lib/types";
import { Edge } from "@xyflow/react";
import DatabaseConnectionNode from "@/components/nodes/DatabaseConnectionNode";
import InputNode from "@/components/nodes/InputNode";
import {v4 as uuidV4} from 'uuid';


const position = { x: Math.random() * 250, y: Math.random() * 250 };
export const initialEdges: Edge[] = [];

export const initialNodes: AppNode[] = [
    {
        id: uuidV4(),
        type: 'databaseConnection',
        position,
        data: { label: 'Database Connection' },
    },
    {
        id: uuidV4(),
        type: 'inputNode',
        position,
        data: { label: 'Input' },
    },
];

export const nodeTypes = {
    databaseConnection: DatabaseConnectionNode,
    inputNode: InputNode,
};
