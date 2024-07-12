import React, { useEffect, useState } from 'react';

const DropdownCheckboxForm = ({ onCheckboxChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [text, setText] = useState('Ninguna');

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
            setText('Ninguna');
            onCheckboxChange(selectedOptions);
            return;
        }
        setText(selectedOptions.map((option) => option).join(', '));
        onCheckboxChange(selectedOptions);
    }, [selectedOptions]);

    return (
        <form >
            <div className="dropdown">
                <button className="select-restriction-btn" type="button">{text}</button>
                <div className="dropdown-content">
                    <label>
                        <input
                            className="checkinput"
                            type="checkbox"
                            name="opciones[]"
                            value="PK"
                            onChange={handleCheckboxChange}
                        />  PK
                    </label>
                    <label>
                        <input
                            className="checkinput"
                            type="checkbox"
                            name="opciones[]"
                            value="FK"
                            onChange={handleCheckboxChange}
                        />  FK
                    </label>
                    <label>
                        <input
                            className="checkinput"
                            type="checkbox"
                            name="opciones[]"
                            value="NN"
                            onChange={handleCheckboxChange}
                        />  NN
                    </label>
                    <label>
                        <input
                            className="checkinput"
                            type="checkbox"
                            name="opciones[]"
                            value="UQ"
                            onChange={handleCheckboxChange}
                        />  UQ
                    </label>

                    <label>
                        <input
                            className="checkinput"
                            type="checkbox"
                            name="opciones[]"
                            value="AI"
                            onChange={handleCheckboxChange}
                        />  AI
                    </label>
                </div>
            </div>
        </form>
    );
};

export default DropdownCheckboxForm;
