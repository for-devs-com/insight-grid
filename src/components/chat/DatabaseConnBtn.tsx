'use client';
import React from 'react';
import {nodeTypes}  from '@/components/InteractiveCanvas.constants';
import useStore from '@/store/useStore';

export default function DatabaseConnBtn() {
    const databaseConnectionNode = nodeTypes['databaseConnection'];
    const addNode = useStore((state) => state.addNode);

    const handleAddNode = () => {
        const position = { x: Math.random() * 250, y: Math.random() * 250 };
        if (typeof position.x !== 'number' || typeof position.y !== 'number') {
            console.error('Generated position is invalid:', position);
            return;
        }
        const newNode = {
            id: `node-${Math.random()}`,
            type: 'databaseConnection',
            position,
            data: { label: 'Database Connection' },
        };
        addNode(newNode);
    };

    return (
        <div>
            {databaseConnectionNode && (
                <button
                    key={databaseConnectionNode['type']}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
                    onClick={handleAddNode}
                >
                    {databaseConnectionNode['type']}
                </button>
            )}
        </div>
    );
}
