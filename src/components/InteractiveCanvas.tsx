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
import 'reactflow/dist/style.css';
import NodeMenu from './NodeMenu';

const nodeTypes = {
    databaseConnection: DatabaseConnectionNode,
    // Agrega más tipos de nodos aquí según sea necesario
};

const LayoutFlow = ({newElements}) => {
    const {fitView} = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeMenuOpen, setNodeMenuOpen] = useState(false);

    // Load nodes and edges from localStorage
    const loadFromLocalStorage = useCallback(() => {
        const storedNodes = JSON.parse(localStorage.getItem('nodes')) || [];
        const storedEdges = JSON.parse(localStorage.getItem('edges')) || [];
        setNodes(storedNodes);
        setEdges(storedEdges);
    }, [setNodes, setEdges]);

    // Load nodes and edges from localStorage when the component mounts
    const saveToLocalStorage = useCallback((nodes, edges) => {
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
    }, []);

    useEffect(() => {
        loadFromLocalStorage();
    }, [loadFromLocalStorage]);

    // Add nodes with validated positions
    const addValidNode = useCallback((newNode) => {
        if (newNode.position && typeof newNode.position.x === 'number' && typeof newNode.position.y === 'number') {
            setNodes((nds) => {
                const updatedNodes = [...nds, newNode];
                saveToLocalStorage(updatedNodes, edges);
                return updatedNodes;
            });
        } else {
            console.error('Node position is invalid:', newNode);
        }
    }, [setNodes, saveToLocalStorage, edges]);

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
    const handleNodesDelete = useCallback((deletedNodes) => {
        setNodes((nds) => {
            const updatedNodes = nds.filter((n) => !deletedNodes.find((d) => d.id === n.id));
            saveToLocalStorage(updatedNodes, edges);
            return updatedNodes;
        });
    }, [setNodes, saveToLocalStorage, edges]);

    // Save nodes and edges to localStorage whenever they change
    useEffect(() => {
        saveToLocalStorage(nodes, edges);
    }, [nodes, edges, saveToLocalStorage]);
    const memoizedNodeTypes = useMemo(() => nodeTypes, []);

    const onLayout = useCallback(() => {
        const layoutedNodes = nodes.map(node => ({
            ...node,
            position: { x: Math.random() * 250, y: Math.random() * 250 },
        }));
        setNodes(layoutedNodes);
        fitView();
    }, [nodes, fitView, setNodes]);


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
                    onEdgesChange={(changes) => {
                        onEdgesChange(changes);
                        saveToLocalStorage(nodes, edges);
                    }}
                    onConnect={(params) => setEdges((eds) => {
                        const updatedEdges = addEdge(params, eds);
                        saveToLocalStorage(nodes, updatedEdges);
                        return updatedEdges;
                    })}
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
