import React, { useState, useEffect } from 'react';

function PanelComponent({ onProjectNameChange, onStateChange }) {
    const [selectedTech, setSelectedTech] = useState('');
    const [selectedOS, setSelectedOS] = useState('');
    const [loginRequired, setLoginRequired] = useState('');
    const [port, setPort] = useState('');


    useEffect(() => {
        if (onStateChange) {
            onStateChange({ selectedTech, selectedOS, loginRequired, port });
        }
    }, [selectedTech, selectedOS, loginRequired, port, onStateChange]);


    const handleTechChange = (event) => {
        setSelectedTech(event.target.value);
    };

    const handleOSChange = (event) => {
        setSelectedOS(event.target.value);
    };

    const handleLoginChange = (event) => {
        setLoginRequired(event.target.value);
    };

    const handlePortChange = (event) => {
        const portValue = Math.max(0, Math.min(9999, Number(event.target.value)));
        setPort(portValue ? portValue.toString().padStart(4, '0') : '');
    };

    return (
        <div style={{ padding: '20px', borderRight: '1px solid #ccc', height: '100vh' }}>
            <label htmlFor="projectName">Project Name:</label>
            <input
                id="projectName"
                type="text"
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="Enter project name"
                style={{ marginTop: '10px', padding: '10px', width: 'calc(100% - 20px)' }}
            />
            {/* Technology Section */}
            <div style={{ marginTop: '20px' }}>
                <label>Technology:</label>
                <div>
                    <input
                        type="radio"
                        id="django"
                        name="tech"
                        value="Django"
                        checked={selectedTech === 'Django'}
                        onChange={handleTechChange}
                    />
                    <label htmlFor="django">Django</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nest"
                        name="tech"
                        value="Nest"
                        checked={selectedTech === 'Nest'}
                        onChange={handleTechChange}
                    />
                    <label htmlFor="nest">Nest</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="fast"
                        name="tech"
                        value="Fast"
                        checked={selectedTech === 'Fast'}
                        onChange={handleTechChange}
                    />
                    <label htmlFor="fast">FastAPI</label>
                </div>
            </div>
            {/* Operating System Section */}
            <div style={{ marginTop: '20px' }}>
                <label>Operating System:</label>
                <div>
                    <input type="radio" id="windows" name="os" value="Windows" checked={selectedOS === 'Windows'} onChange={handleOSChange} />
                    <label htmlFor="windows">Windows</label>
                </div>
                <div>
                    <input type="radio" id="linux" name="os" value="Linux" checked={selectedOS === 'Linux'} onChange={handleOSChange} />
                    <label htmlFor="linux">Linux</label>
                </div>
                <div>
                    <input type="radio" id="mac" name="os" value="Mac" checked={selectedOS === 'Mac'} onChange={handleOSChange} />
                    <label htmlFor="mac">Mac</label>
                </div>
            </div>
            {/* Login Required Section */}
            <div style={{ marginTop: '20px' }}>
                <label>Login:</label>
                <div>
                    <input type="radio" id="loginTrue" name="login" value="True" checked={loginRequired === 'True'} onChange={handleLoginChange} />
                    <label htmlFor="loginTrue">True</label>
                </div>
                <div>
                    <input type="radio" id="loginFalse" name="login" value="False" checked={loginRequired === 'False'} onChange={handleLoginChange} />
                    <label htmlFor="loginFalse">False</label>
                </div>
            </div>
            {/* Port Section */}
            <div style={{ marginTop: '20px' }}>
                <label>Port:</label>
                <input
                    type="number"
                    value={port}
                    onChange={handlePortChange}
                    placeholder="0000"
                    min="0"
                    max="9999"
                    style={{ marginTop: '10px', padding: '10px', width: 'calc(100% - 20px)' }}
                />
            </div>
        </div>
    );
}

export default PanelComponent;