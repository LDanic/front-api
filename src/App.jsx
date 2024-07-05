import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from 'reactflow';

import 'reactflow/dist/style.css';
import './styles/global.css';
import CustomNode from './components/CustomNode';

let id = 1;
const initialNodes = [
  {
    id: id.toString(),
    type: 'customNode',
    position: { x: 0, y: 0 },
    data: {
      label: null,
    },
  },
];

const initialEdges = [];

const nodeTypes = {
  customNode: CustomNode,
};

function createNode() {
  id++;
  return {
    id: id.toString(),
    type: 'customNode',
    position: {
      x: window.innerWidth/2,
      y: window.innerHeight/2,
    },
    data: {
      label: null,
    },
  };
}

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
        <Panel position="top-right">
          <button onClick={
            () => setNodes((nodes) => [...nodes, createNode()])
          }>Hola</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
