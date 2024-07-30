'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { nodeTypes } from '@/components/InteractiveCanvas.constants';
import useStore from "@/store/useStore";


export default function NodeMenu({ open, onClose}) {
    const addNode = useStore((state) => state.addNode);

    const handleAddNode = (type) => {
        const position = { x: Math.random() * 250, y: Math.random() * 250 };
        const newNode = {
            id: `${type}-${Math.random()}`,
            type,
            position,
            data: {label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`  },
        }
        addNode(newNode);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <DialogHeader className="bg-gray-800 text-white px-4 py-2">
                        <DialogTitle>Ops Library</DialogTitle>
                        <DialogDescription>Select one to add</DialogDescription>
                    </DialogHeader>
                    <DialogContent className="bg-gray-100 p-4">
                        <div className="w-64 p-4">
                            {Object.entries(nodeTypes).map(([type]) => (
                                <button
                                    key={type}
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
                                    onClick={() => {
                                        handleAddNode(type);
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </div>
            </DialogContent>
        </Dialog>
    );
}
