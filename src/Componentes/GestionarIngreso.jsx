import React, { useState } from "react";
import "./GestionarIngreso.css";

function GestionarIngreso({ volver }) {
  const [cedula, setCedula] = useState("");

  const handleGenerar = () => {
    console.log("Generar reporte de producción para cédula:", cedula);
  };

  return (
    <div className="gestionaringreso-container">
      <div className="gestionaringreso-card">
        <h2>Gestión de la producción</h2>
        <form className="gestionaringreso-form">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ingrese la cédula"
          />
          <div className="botones">
            <button
              type="button"
              className="btn-volver"
              onClick={volver}
            >
              Volver
            </button>
            <button
              type="button"
              className="btn-generar"
              onClick={handleGenerar}
            >
              Generar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GestionarIngreso;
