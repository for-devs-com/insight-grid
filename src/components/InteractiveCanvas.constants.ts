import {Edge, Node} from "reactflow";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
    {
        id: '1',
        data: {label: 'FilterEngine'},
        position: {x: 0, y: 0},
    },
    {
        id: '2',
        data: {label: 'Ouput'},
        position: {x: 100, y: 100},
    },
    {
        id: '3',
        data: {label: 'Operations'},
        position: {x: 200, y: 200},
    },
];