import React, { useState, useEffect } from "react";

function PanelComponent({ onStateChange }) {
  const [projectName, setProjectName] = useState(""); // State to handle project name
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedOS, setSelectedOS] = useState("");
  const [loginRequired, setLoginRequired] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        projectName,
        selectedTech,
        selectedOS,
        loginRequired,
        port,
      });
    }
  }, [
    projectName,
    selectedTech,
    selectedOS,
    loginRequired,
    port,
    onStateChange,
  ]);

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
    setPort(portValue ? portValue.toString().padStart(4, "0") : "");
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRight: "1px solid #ccc",
        height: "100vh",
        width: '35vh', 
        backgroundColor: '#2d2d2d'
      }}
    >
      <label htmlFor="projectName">Project Name:</label>
      <input
        id="projectName"
        type="text"
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "calc(100% - 20px)",
          backgroundColor: '#222222',
          border:'1px solid #414141'
        }}
      />
      {/* Technology Section */}
      <div style={{ marginTop: "20px" }}>
        <label>Technology:</label>
        <div>
          <input
            type="radio"
            id="django"
            name="tech"
            value="Django"
            checked={selectedTech === "Django"}
            onChange={handleTechChange}
          />
          <label htmlFor="django">Django</label>
        </div>
        <div>
          <input
            type="radio"
            id="nest"
            name="tech"
            value="Nest.js"
            checked={selectedTech === "Nest.js"}
            onChange={handleTechChange}
          />
          <label htmlFor="nest.js">Nest.js</label>
        </div>
        <div>
          <input
            type="radio"
            id="fast"
            name="tech"
            value="Fastapi"
            checked={selectedTech === "Fastapi"}
            onChange={handleTechChange}
          />
          <label htmlFor="fastapi">FastAPI</label>
        </div>
      </div>
      {/* Operating System Section */}
      <div style={{ marginTop: "20px" }}>
        <label>Operating System:</label>
        <div>
          <input
            type="radio"
            id="windows"
            name="os"
            value="Windows"
            checked={selectedOS === "Windows"}
            onChange={handleOSChange}
          />
          <label htmlFor="windows">Windows</label>
        </div>
        <div>
          <input
            type="radio"
            id="linux"
            name="os"
            value="Linux"
            checked={selectedOS === "Linux"}
            onChange={handleOSChange}
          />
          <label htmlFor="linux">Linux</label>
        </div>
        <div>
          <input
            type="radio"
            id="mac"
            name="os"
            value="Mac"
            checked={selectedOS === "Mac"}
            onChange={handleOSChange}
          />
          <label htmlFor="mac">Mac</label>
        </div>
      </div>
      {/* Port Section */}
      <div style={{ marginTop: "20px" }}>
        <label>Port:</label>
        <input
          type="number"
          value={port}
          onChange={handlePortChange}
          placeholder="0000"
          min="0"
          max="9999"
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "calc(100% - 20px)",
            backgroundColor: '#222222',
            border:'1px solid #414141'
          }}
        />
      </div>
    </div>
  );
}

export default PanelComponent;
