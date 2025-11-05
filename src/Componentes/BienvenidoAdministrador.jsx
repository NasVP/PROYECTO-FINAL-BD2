import React from "react";
import "./BienvenidoAdministrador.css";

function BienvenidoAdministrador() {
  return (
    <main className="pagina-administrador-inicio">
      <h1>¡Bienvenido Administrador!</h1>
      <button
          className="boton-siguiente-administrador"
          onClick={() => (window.location.href = "/funcion-administrador")}
        >
          Siguiente
        </button>
    </main>
  );
}

export default BienvenidoAdministrador;

