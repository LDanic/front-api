import React, { useState, useCallback } from 'react';
import ReactFlow, {
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
import CustomEdge from './components/CustomEdge';

let id = 1;
const initialNodes = [
  {
    id: id.toString(),
    type: 'customNode',
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    data: {
      label: null,
    },
  },
];

const initialEdges = [];

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
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


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom-edge', data: { label: "" } }, eds)),
    [setEdges],
  );

  // New function to handle state changes from PanelComponent
  const handlePanelStateChange = useCallback((panelState) => {
    // console.log(panelState);
  }, []);

  return (
    <div className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-right">
          <button onClick={() => setNodes((nodes) => [...nodes, createNode()])}>Add table</button>
        </Panel>

        <Panel position="top-left">
          <PanelComponent onStateChange={handlePanelStateChange} />
        </Panel>

        <Panel position="bottom-left" >
          <button style={{ marginLeft: '100px' }} onClick={() => {
            nodes.forEach(node => {
              console.log(`Node ID: ${node.id} Rows:`);
              if (node.type === 'customNode' && node.data.rows) {
                node.data.rows.forEach((row, index) => {
                  console.log(`Row ${index + 1}:`, row);
                });
              } else {
                console.log('No rows');
              }
            });
          }}>Print Rows</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
