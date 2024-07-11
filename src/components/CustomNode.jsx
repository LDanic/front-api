import React, { useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './NodeStyles.css';

const CustomNode = ({ data, isConnectable }) => {
  const initialColumns = [
    { id: 1, type: 'label', value: 'Restricciones' },
    { id: 2, type: 'label', value: 'Nombre' },
    { id: 3, type: 'label', value: 'Tipo Dato' },
  ];

  const [rows, setRows] = useState([[...initialColumns]]); // Inicialmente una fila con las columnas iniciales
  const [headerValue, setHeaderValue] = useState('');


  const addRow = () => {
    const newRow = [{ id: 1, type: 'select-res', value: "" }, 
                    { id: 2, type: 'input', value: "" }, 
                    { id: 3, type: 'select-dt', value: "INT" }];
    setRows([...rows, newRow]); // Agrega la nueva fila al estado de filas
  };

  const deleteRow = (rowIndex) => {
    if (rows.length > 1) { 
      const updatedRows = rows.filter((_, index) => index !== rowIndex);
      setRows(updatedRows);
    }
  };
  

  const handleInputChange = (event, rowIndex, colIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex].value = event.target.value;
    // console.log(updatedRows[rowIndex][colIndex].text)
    setRows(updatedRows);
  };

  useEffect(() => {
    data.rows = rows;
    data.headerValue = headerValue;
  }, [rows, headerValue]);

  return (
    <div className="custom-node">
      <div className="custom-node-header">
        <input
          type="text"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
          placeholder="Nombre de la entidad"
        />
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="custom-node-row">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="custom-node-column">

              {col.type === "label" ? (
                <p>
                  {col.value}
                </p>
              ) : col.type === "select-dt" ? (
                <select
                  value={col.value}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                >
                  <option value="INT">INT</option>
                  <option value="DECIMAL">DECIMAL</option>
                  <option value="VARCHAR">VARCHAR</option>
                  <option value="BINARY">BINARY</option>
                </select>
              ) : col.type === "select-res" ? (
                <select
                  value={col.value}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                >
                  <option value="NA">No Aplica</option>
                  <option value="PK">PK</option>
                  <option value="FK">FK</option>
                  <option value="NOT NULL">NOT NULL</option>
                </select>
              ): (
                <input
                  type="text"
                  value={col.value}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                />
              )}
            </div>
          ))}
          {rowIndex !== 0 && (
            <button onClick={() => deleteRow(rowIndex)} className="delete-row-button">
              <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />
            </button>
          )}
        </div>
      ))}
      <button onClick={addRow} className="add-row-button">Add atribute</button>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
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
        type="source"
        position={Position.Top}
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;
