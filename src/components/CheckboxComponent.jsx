import React, { useEffect, useState } from "react";

const DropdownCheckboxForm = ({
  onCheckboxChange,
  value,
  rowIndex,
  nodeIndex,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState("Ninguna");

  useEffect(() => {
    setSelectedOptions(value);

    let checkboxes = document.querySelectorAll(
      ".checkinput" + rowIndex + nodeIndex
    );

    // Marcar todos los checkboxes
    checkboxes.forEach((checkbox) => {
      if (value.includes(checkbox.value)) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }, [value]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      } else {
        return prevSelectedOptions.filter((option) => option !== value);
      }
    });
  };

  useEffect(() => {
    if (selectedOptions.length === 0) {
      setText("Ninguna");
      onCheckboxChange(selectedOptions);
      return;
    }
    setText(selectedOptions.map((option) => option).join(", "));
    onCheckboxChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <form>
      <div className="dropdown">
        <button className="select-restriction-btn" type="button">
          {text}
        </button>
        <div className="dropdown-content">
          <label>
            <input
              className={
                "checkinput" + rowIndex.toString() + nodeIndex.toString()
              }
              type="checkbox"
              name="opciones[]"
              value="PK"
              onChange={handleCheckboxChange}
            />{" "}
            PK
          </label>
          <label>
            <input
              className={
                "checkinput" + rowIndex.toString() + nodeIndex.toString()
              }
              type="checkbox"
              name="opciones[]"
              value="FK"
              onChange={handleCheckboxChange}
            />{" "}
            FK
          </label>
          <label>
            <input
              className={
                "checkinput" + rowIndex.toString() + nodeIndex.toString()
              }
              type="checkbox"
              name="opciones[]"
              value="NN"
              onChange={handleCheckboxChange}
            />{" "}
            NN
          </label>
          <label>
            <input
              className={
                "checkinput" + rowIndex.toString() + nodeIndex.toString()
              }
              type="checkbox"
              name="opciones[]"
              value="UQ"
              onChange={handleCheckboxChange}
            />{" "}
            UQ
          </label>

          <label>
            <input
              className={
                "checkinput" + rowIndex.toString() + nodeIndex.toString()
              }
              type="checkbox"
              name="opciones[]"
              value="AI"
              onChange={handleCheckboxChange}
            />{" "}
            AI
          </label>
        </div>
      </div>
    </form>
  );
};

export default DropdownCheckboxForm;
