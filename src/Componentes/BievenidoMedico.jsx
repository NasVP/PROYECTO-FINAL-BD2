import React from "react";
import "./BienvenidoMedico.css";

function BienvenidoMedico() {
  return (
    <main className="pagina-medico-inicio">
      <h1>¡Bienvenido Médico!</h1>
      <button
          className="boton-siguiente-medico"
          onClick={() => (window.location.href = "/funcion-medico")}
        >
          Siguiente
        </button>
    </main>
  );
}

export default BienvenidoMedico;

