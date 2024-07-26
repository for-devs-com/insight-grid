import React, {useCallback, useEffect, useState, useMemo} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    useReactFlow,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'reactflow';

import DatabaseConnectionNode from './DatabaseConnectionNode';
import {initialNodes, initialEdges} from './InteractiveCanvas.constants';
import 'reactflow/dist/style.css';

import NodeMenu from './NodeMenu';

const getLayoutedElements = (nodes, edges) => {
    return {nodes, edges};
};

const nodeTypes = {
    databaseConnection: DatabaseConnectionNode,
    // Agrega más tipos de nodos aquí según sea necesario
};

const LayoutFlow = ({newElements}) => {
    const {fitView} = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeMenuOpen, setNodeMenuOpen] = useState(false);

    // Load nodes and edges from localStorage
    useEffect(() => {
        const storedNodes = localStorage.getItem('nodes');
        const storedEdges = localStorage.getItem('edges');
        if (storedNodes) setNodes(JSON.parse(storedNodes));
        if (storedEdges) setEdges(JSON.parse(storedEdges));
    }, [setNodes, setEdges]);

    // Add a new node to the canvas if it has a valid position
    const addValidNode = useCallback((newNode) => {
        if (newNode.position && typeof newNode.position.x === 'number' && typeof newNode.position.y === 'number') {
            setNodes((nds) => [...nds, newNode]);
        } else {
            console.error('Node position is invalid:', newNode);
        }
    }, [setNodes]);

    // Add a new node to the canvas with a random valid position
    const addNode = (type) => {
        const position = {x: Math.random() * 250, y: Math.random() * 250};
        if (typeof position.x !== 'number' || typeof position.y !== 'number') {
            console.error('Generated position is invalid:', position);
            return;
        }
        const newNode = {
            id: `node-${nodes.length + 1}`,
            type,
            position,
            data: {label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Node`},
        };
        addValidNode(newNode);
    };

    // Add new elements to the canvas from props passed by the Chat component
    useEffect(() => {
        if (newElements.length) {
            newElements.forEach(addValidNode);
        }
    }, [newElements, addValidNode]);

    // Handle nodes deletion
    const handleNodesDelete = useCallback((deletedNodes: any[]) => {
        setNodes((nds) => {
            const updatedNodes = nds.filter((n) => !deletedNodes.find((d) => d.id === n.id));
            localStorage.setItem('nodes', JSON.stringify(updatedNodes));
            return updatedNodes;
        });
    }, [setNodes]);

    // Save nodes and edges to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('nodes', JSON.stringify(nodes));
    }, [nodes]);

    useEffect(() => {
        localStorage.setItem('edges', JSON.stringify(edges));
    }, [edges]);

    const memoizedNodeTypes = useMemo(() => nodeTypes, []);

    const onLayout = useCallback(() => {
        const layouted = getLayoutedElements(nodes, edges);

        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);

        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [nodes, edges, fitView]);


    return (
        <div className="flex flex-col h-full bg-gray-900">
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
                    onAddNode={addNode}
                />
            </div>
            <div className="flex-grow relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={(changes) => {
                        onNodesChange(changes);
                        handleNodesDelete(changes.filter(change => change.type === 'remove'));
                    }}
                    onEdgesChange={onEdgesChange}
                    onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
                    fitView
                    nodeTypes={memoizedNodeTypes}
                    className="bg-gray-800"
                >
                    <MiniMap nodeColor={(node) => {
                        switch (node.type) {
                            case 'databaseConnection':
                                return 'blue';
                            default:
                                return '#FFCC00';
                        }
                    }}/>
                    <Controls/>
                    <Background color="#888" gap={16}/>
                </ReactFlow>
            </div>
        </div>
    );
};

export default function InteractiveCanvas({newElements}) {
    return (
        <ReactFlowProvider>
            <LayoutFlow newElements={newElements}/>
        </ReactFlowProvider>
    );
}
