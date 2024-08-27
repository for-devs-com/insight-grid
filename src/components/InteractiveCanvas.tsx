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
import useCanvasStore from '@/store/useCanvasStore';
import NodeMenu from './nodes/NodeMenu';
import { nodeTypes } from '@/components/InteractiveCanvas.constants';
import { useShallow } from "zustand/react/shallow";
import { AppNode, InteractiveCanvasState } from "@/lib/types";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import Dagre from '@dagrejs/dagre';

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

// Layout function
const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
        g.setNode(node.id, {
            ...node,
            width: node.measured?.width ?? 0,
            height: node.measured?.height ?? 0,
        }),
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

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

    } = useCanvasStore(useShallow(selector));

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
    /*const onLayout = useCallback(() => {
        const layoutNodes = nodes.map((node) => ({
            ...node,
            position: { x: Math.random() * 250, y: Math.random() * 250 },
        }));
        setNodes(layoutNodes);
        fitView();
    }, [nodes, fitView, setNodes]);*/

    const onLayout = useCallback(
        (direction) => {
            console.log(nodes);
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges],
    );

    return (
        /*Interactive Canvas*/
        <div className="flex-1 flex-grow h-screen">
            {/* Node Menu*/}
            <div className="flex  items-center py-2 bg-gray-800 border-b border-gray-700">
                <button
                    onClick={() => setNodeMenuOpen(true)}
                    className="bg-blue-500 text-white mx-2 px-4 py-2 rounded"
                >
                    Open Node Menu
                </button>
                <NodeMenu
                    open={nodeMenuOpen}
                    onClose={() => setNodeMenuOpen(false)}
                />
                <button
                    onClick={() => onLayout('TB')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Vertical Layout
                </button>
                <button
                    onClick={() => onLayout('LR')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
                >
                    Horizontal Layout
                </button>
            </div>

            {/*Interactive Canvas*/}

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
    );
};

/*InteractiveCanvas component*/
export default function InteractiveCanvas({ newElements}) {
    return (
        <ReactFlowProvider>
            <LayoutFlow newElements={newElements} />
        </ReactFlowProvider>
    );
}
