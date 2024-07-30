import {
    Edge,
    Node,
    OnNodesChange,
    OnConnect,
    OnEdgesChange,
} from '@xyflow/react';


export type AppNode = Node & {
    position: { x: number, y: number };
};

export type InteractiveCanvasState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: AppNode) => void;
    removeNode: (nodeId: string) => void;
    isConnected: boolean;
    setIsConnected: (connected: boolean) => void;
    setNodeData: (id: string, data: any) => void;
};
