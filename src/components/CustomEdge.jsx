import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  MarkerType
} from 'reactflow';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, data }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleSelectChange = (event) => {
    const newLabel = event.target.value;
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              label: newLabel,
            },
          };
        }
        return edge;
      })
    );
  };

  const labelValue = data?.label || ""; // Valor predeterminado si data.label no está definido

  return (
    <>
      <BaseEdge 
        id={id} 
        path={edgePath} 
        markerEnd={{ type: MarkerType.ArrowClosed }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan custom-edge-label"
        >
          <select value={labelValue} onChange={handleSelectChange} required>
            <option disabled value="">Selecciona la relación</option>
            <option value="uno a uno">uno a uno</option>
            <option value="uno a muchos">uno a muchos</option>
            <option value="muchos a muchos">muchos a muchos</option>
          </select>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

