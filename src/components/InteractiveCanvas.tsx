'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Controls,
    Background,
} from '@xyflow/react';
import useStore from '@/store/useStore';
import NodeMenu from './nodes/NodeMenu';
import { nodeTypes } from '@/components/InteractiveCanvas.constants';
import { useShallow } from "zustand/react/shallow";
import { AppNode, InteractiveCanvasState } from "@/components/types";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';

// Selector for the store
const selector = (state: InteractiveCanvasState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    addNode: state.addNode,
    removeNode: state.removeNode,
    isConnected: state.isConnected,
    setIsConnected: state.setIsConnected,
});

// LayoutFlow component
const LayoutFlow = (newElements: any) => {
    const { fitView } = useReactFlow(); // Hook to fit the view

    // Destructure the store
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        setNodes,
        setEdges,
        addNode,
        removeNode,
        isConnected,
        setIsConnected,

    } = useStore(useShallow(selector));

    // State for the Node Menu
    const [nodeMenuOpen, setNodeMenuOpen] = useState(false);

    // Add valid node to the store
    const addValidNode = useCallback(
        (newNode: AppNode) => {
            if (
                newNode.position &&
                typeof newNode.position.x === 'number' &&
                typeof newNode.position.y === 'number'
            ) {
                addNode(newNode);
            } else {
                console.error('Node position is invalid:', newNode);
            }
        }, [setNodes]
    );

    // Add new elements to the store
    useEffect(() => {
        if (newElements.length) {
            newElements.forEach(addValidNode);
        }
    }, [newElements, addValidNode]);


    const handleNodesDelete = (deletedNodes: any[]) => {
        deletedNodes.forEach(node => removeNode(node.id));
    }

    // Layout the nodes randomly
    const onLayout = useCallback(() => {
        const layoutNodes = nodes.map((node) => ({
            ...node,
            position: { x: Math.random() * 250, y: Math.random() * 250 },
        }));
        setNodes(layoutNodes);
        fitView();
    }, [nodes, fitView, setNodes]);

    return (
        // Interactive Canvas
        <div className="flex flex-col h-full bg-gray-900">
            // Node Menu
            <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                <button
                    onClick={() => setNodeMenuOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Open Node Menu
                </button>
                <NodeMenu
                    open={nodeMenuOpen}
                    onClose={() => setNodeMenuOpen(false)}
                />
                *<button
                    onClick={onLayout}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Reorganize Nodes
                </button>*
            </div>

            // Interactive Canvas
            <div className="flex-grow relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    className="bg-gray-800"
                    fitView
                >
                    <MiniMap nodeColor={(node) => {
                        switch (node.type) {
                            case 'databaseConnection':
                                return 'blue';
                            default:
                                return '#FFCC00';
                        }
                    }} />
                    <Controls />
                    <Background color="#888" gap={16} />
                </ReactFlow>
            </div>
        </div>
    );
};

// InteractiveCanvas component
export default function InteractiveCanvas({ newElements}) {
    return (
        <ReactFlowProvider>
            <LayoutFlow newElements={newElements} />
        </ReactFlowProvider>
    );
}
