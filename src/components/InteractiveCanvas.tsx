'use client';
import React, {useCallback, useEffect, useState} from 'react';
import {
    Background,
    BackgroundVariant,
    Controls, Edge,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow, useStoreApi,
} from '@xyflow/react';
import useCanvasStore from '@/store/useCanvasStore';
import NodeMenu from './nodes/NodeMenu';
import {nodeTypes} from '@/components/InteractiveCanvas.constants';
import {useShallow} from "zustand/react/shallow";
import {AppNode, InteractiveCanvasState} from "@/lib/types";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import Dagre from '@dagrejs/dagre';

const MIN_DISTANCE = 150;

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

// Edge options
const edgeOptions = {
    animated: true,
    style: {
        stroke: 'white',
    },
};

// Layout function
const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({rankdir: options.direction});

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
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return {...node, position: {x, y}};
        }),
        edges,
    };
};

// LayoutFlow component
const LayoutFlow = (newElements: any) => {
    const {fitView} = useReactFlow(); // Hook to fit the view
    const {getInternalNode} = useReactFlow();

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

    const onLayout = useCallback(
        (direction) => {
            console.log(nodes);
            const layouted = getLayoutedElements(nodes, edges, {direction});

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges],
    );


    const getClosestEdge = useCallback((node: AppNode) => {
        const {nodes} = useCanvasStore.getState();
        const internalNode = getInternalNode(node.id);

        const closestNode = nodes.reduce(
            (res, n) => {
                if (n.id !== internalNode.id) {
                    const dx = n.position.x - internalNode.internals.positionAbsolute.x;
                    const dy = n.position.y - internalNode.internals.positionAbsolute.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
            } as { distance: number; node: AppNode | null }
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource =
            closestNode.node.position.x < internalNode.internals.positionAbsolute.x;

        return {
            id: closeNodeIsSource
                ? `${closestNode.node.id}-${node.id}`
                : `${node.id}-${closestNode.node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
    }, []);

    const onNodeDrag = useCallback(
        (event, node: AppNode) => {
            const closeEdge = getClosestEdge(node);
            if (!closeEdge) return;

            useCanvasStore.setState((state) => {
                const nextEdges = state.edges.map((ne) => {
                    if (ne.source === closeEdge.source && ne.target === closeEdge.target) {
                        ne.source = 'temp';
                    }
                    return ne;
                });

                nextEdges.push(closeEdge as Edge); // Asegurando que closeEdge sea de tipo Edge
                return {edges: nextEdges} as Partial<InteractiveCanvasState>;
            });
        },
        [getClosestEdge]
    );

    return (
        /*Interactive Canvas*/
        <div className="flex flex-col h-screen bg-gray-950">
            {/* Node Menu*/}
            <div className="flex flex-row items-center px-3 py-3 bg-gray-800 border-b border-gray-700">
                <button
                    onClick={() => setNodeMenuOpen(true)}
                    className="bg-blue-500 text-white mx-2 px-4 py-2 rounded"
                >
                    Open Menu
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
            <div className="flex-1">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    className="bg-gray-800"
                    fitView
                    style={{width: '100%', height: '100%'}}
                    connectionLineStyle={{stroke: '#FFCC00'}}
                    defaultEdgeOptions={edgeOptions}
                    maxZoom={4}
                    minZoom={0.2}
                    onNodeDrag={onNodeDrag}
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
                    <Background gap={56}/>
                </ReactFlow>
            </div>

        </div>
    );
};

/*InteractiveCanvas component*/
export default function InteractiveCanvas({newElements}) {
    return (
        <ReactFlowProvider>
            <LayoutFlow newElements={newElements}/>
        </ReactFlowProvider>
    );
}
