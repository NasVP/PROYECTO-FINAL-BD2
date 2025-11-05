import React from "react";
import "./BienvenidoEnfermero.css";

function BienvenidoEnfermero() {
  return (
    <main className="pagina-enfermero-inicio">
      <h1>¡Bienvenido Enfermero!</h1>
      <button
          className="boton-siguiente-enfermero"
          onClick={() => (window.location.href = "/funcion-enfermero")}
        >
          Siguiente
        </button>
    </main>
  );
}

export default BienvenidoEnfermero;

