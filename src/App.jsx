import React, { useState, useCallback } from 'react';
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
import PanelComponent from './components/PanelComponent.jsx';

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
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    data: {
      label: null,
    },
  };
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [projectName, setProjectName] = useState(''); // State to handle project name


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // New function to handle state changes from PanelComponent
  const handlePanelStateChange = useCallback((panelState) => {
    console.log(panelState);
  }, []);

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
          <button onClick={() => setNodes((nodes) => [...nodes, createNode()])}>Add table</button>
        </Panel>

        <Panel position="top-left">
          <PanelComponent onProjectNameChange={(value) => setProjectName(value)} onStateChange={handlePanelStateChange} />
        </Panel>
      </ReactFlow>
    </div>
  );
}
