'use client';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { addEdge, applyNodeChanges, applyEdgeChanges, Edge } from '@xyflow/react';
import { AppNode, InteractiveCanvasState } from "@/components/nodes/types";

const useStore = create<InteractiveCanvasState>()(
	devtools(
		persist(
			(set, get) => {
				return ({
					nodes: [] as AppNode[],
					edges: [] as Edge[],
					onNodesChange: (changes) => {
						set({
							nodes: applyNodeChanges(changes, get().nodes),
						});
					},
					onEdgesChange: (changes) => {
						set({
							edges: applyEdgeChanges(changes, get().edges),
						});
					},
					onConnect: (connection) => {
						set({
							edges: addEdge(connection, get().edges),
						});
					},
					setNodes: (nodes) => {
						set({nodes});
					},
					setEdges: (edges) => {
						set({edges});
					},
					addNode: (node) => {
						const nodesToAdd = get().nodes;
						set({nodes: [...nodesToAdd, node]});
					},
					removeNode: (nodeId) => {
						const nodes = get().nodes.filter((node) => node.id !== nodeId);
						set({nodes});
					},
					isConnected: false,
					setIsConnected: (connected) => {
						set({ isConnected: connected });
					},
					setNodeData: (id, data) => {
						set((state) => ({
							nodes: state.nodes.map((node) =>
								node.id === id ? { ...node, data: { ...node.data, ...data } } : node
							),
						}));
					},
				});
			},
			{
				name: 'interactive-canvas-storage', // Nombre del local storage
				storage: createJSONStorage(() => localStorage),
			}
		)
	)
);

export default useStore;
