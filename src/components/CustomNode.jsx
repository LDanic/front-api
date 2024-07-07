import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';

const CustomNode = ({ data, isConnectable }) => {
  const initialColumns = [
    { id: 1, text: 'restricciones' },
    { id: 2, text: 'Nombre' },
    { id: 3, text: 'tipo Dato' },
  ];

  const [rows, setRows] = useState([[...initialColumns]]); // Inicialmente una fila con las columnas iniciales

  const addRow = () => {
    const newRow = Array.from({ length: initialColumns.length }, (_, index) => ({
      id: index + 1,
      text: '',
    }));
    setRows([...rows, newRow]); // Agrega la nueva fila al estado de filas
  };

  const handleInputChange = (event, rowIndex, colIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex].text = event.target.value;
    console.log(updatedRows[rowIndex][colIndex].text)
    setRows(updatedRows);
  };

  return (
    <div className="custom-node">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="custom-node-row">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="custom-node-column">
              <input
                type="text"
                value={col.text}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                placeholder={col.text}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={addRow} className="add-row-button">Añadir atributo</button>
      <Handle
        type="source"
        position="right"
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left"
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;
