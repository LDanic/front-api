import { getBezierPath, useInternalNode, BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,} from "@xyflow/react";

import { getEdgeParams } from "../utils/edgesManager.js";
import './EdgesStyles.css';

function CustomEdge({ id, source, target, markerEnd, data }) {
  const { setEdges } = useReactFlow();
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
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
      markerEnd={markerEnd}
      className="custom-edge"/>

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
            <option disabled hidden value="">Selecciona la relación</option>
            <option value="1:1">1:1</option>
            <option value="1:n">1:n</option>
            <option value="0:n">0:n</option>
            <option value="0:1">0:1</option>
          </select>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
