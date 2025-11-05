import React from "react";
import "./QuienesSomos.css";
import imagenCentro from "../Imagenes/QuienesSomos.jpg";

const QuienesSomos = () => {
  return (
    <div
      className="qs-container"
      style={{ backgroundImage: `url(${imagenCentro})` }} 
    >
      <h1 className="qs-titulo">IPS ORCAS</h1>
      <h2 className="qs-subtitulo">"TU SALUD AL CUIDADO DE LAS MEJORES MANOS"</h2>

      <div className="qs-cuadro qs-superior-izq">
        <h2>Misión</h2>
        <p>
          Brindar servicios de salud de calidad, con atención humana y profesional,
          comprometidos con el bienestar de nuestros pacientes.
        </p>
      </div>

      <div className="qs-cuadro qs-superior-der">
        <h2>Quiénes Somos</h2>
        <p>
          Somos una institución privada dedicada a brindar servicios de salud integrales con
          profesionalismo, etica y calidez humana.
        </p>
      </div>

      <div className="qs-cuadro qs-inferior-izq">
        <h2>Visión</h2>
        <p>
          Para el 2040 ser una institución líder en salud,acreditada y reconocida por su excelencia
          innovación, calidez humana y compromiso ambiental.
        </p>
      </div>

      <div className="qs-cuadro qs-inferior-der">
        <h2>Datos de Contacto</h2>
        <p>Direccion: Cra 15 # 25-96 Bogotá</p>
        <p>Telefono: 601 5207890</p>
        <p>Correo electronico: orcasips@tusalud.gov.co</p>
      </div>

      <button
        className="qs-boton-volver"
        onClick={() => (window.location.href = "/")}
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default QuienesSomos;
