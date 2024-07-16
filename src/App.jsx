import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./styles/global.css";
import CustomNode from "./components/CustomNode";
import PanelComponent from "./components/PanelComponent.jsx";
import CustomEdge from "./components/CustomEdge";
import { generateXML, generateRelation } from "./utils/XMLgenerator.js";

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

let id = 1;
const initialNodes = [
  {
    id: id.toString(),
    type: "customNode",
    position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    data: {
      idnode: id,
    },
  },
];

const initialEdges = [];

function createNode() {
  id++;
  return {
    id: id.toString(),
    type: "customNode",
    position: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    data: {
      idnode: id,
      conectedTables: [],
    },
  };
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [panelState, setPanelState] = useState({});

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "customEdge",
            markerEnd: { type: MarkerType.ArrowClosed },
            data: {
              label: "",
              conectedTables: [],
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  // New function to handle state changes from PanelComponent
  const handlePanelStateChange = useCallback((panelState) => {
    setPanelState(panelState);
  }, []);

  useEffect(() => {
    nodes.forEach((node) => {
      const foundEdges = edges.filter((edge) => edge.target === node.id);
      node.data.conectedTables = foundEdges.map(
        (edge) => nodes.find((node) => node.id == edge.source).data.headerValue
      );
    });
  }, [edges, nodes]);

  const httpHandler = async () => {
    const url = "http://localhost:8000/fastapi/download";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: generateXML(nodes, edges, panelState),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.download =
        panelState.projectName +
        "." +
        (panelState.selectedOS.toUpperCase() == "WINDOWS" ? "bat" : "sh");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

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
        connectionMode={ConnectionMode.Loose}
      >

        <Background className='background' variant="dots" gap={12} size={1} />
        <Panel position="top-right">
          <button className= "add-button" onClick={() => setNodes((nodes) => [...nodes, createNode()])}>
            Add table
          </button>
        </Panel>

        <Panel position="top-left">
          <PanelComponent onStateChange={handlePanelStateChange} />
        </Panel>

        <Panel position="bottom-left">
          <button style={{ marginLeft: '90px', backgroundColor: 'black' }} onClick={httpHandler}>
            Send
          </button>
        </Panel>
        <Controls className="react-flow-controls" />
      </ReactFlow>
    </div>
  );
}
