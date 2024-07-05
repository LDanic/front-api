import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './styles/global.css';
import CustomNode from './components/CustomNode';

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 0, y: 0 },
    data: {
      label: null,
    },
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 0, y: 100 },
    data: {
      label: null,
    },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  customNode: CustomNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
