import React, { useState, useEffect } from "react";
import "./InformeSatisfaccion.css";

const InformeSatisfaccion = ({ onVolver }) => {
  // Supongamos que las evaluaciones vienen del localStorage o del backend
  const [evaluaciones, setEvaluaciones] = useState([]);

  // Simulación de datos obtenidos (luego puedes reemplazar por API o localStorage)
  useEffect(() => {
    const datosSimulados = [
      {
        id: 1,
        nombre: "Juan Pérez",
        telefono: "3004567890",
        fecha: "04/11/2025",
        promedio: 4.6,
        comentario: "Excelente atención, muy amables.",
      },
      {
        id: 2,
        nombre: "María Gómez",
        telefono: "3109876543",
        fecha: "03/11/2025",
        promedio: 3.9,
        comentario: "Buena atención pero el tiempo de espera fue largo.",
      },
    ];

    setEvaluaciones(datosSimulados);
  }, []);

  // Calcular promedio general
  const promedioGeneral =
    evaluaciones.length > 0
      ? (
          evaluaciones.reduce((acc, e) => acc + e.promedio, 0) /
          evaluaciones.length
        ).toFixed(2)
      : 0;

  return (
    <div className="informe-satisfaccion">
      <h2>Informe de Satisfacción de los Usuarios</h2>

      <p className="descripcion">
        En esta sección se muestran los resultados de las evaluaciones realizadas por los pacientes
        sobre la atención en la IPS.
      </p>

      {/* Promedio general */}
      <div className="promedio-general">
        <strong>Promedio general de satisfacción:</strong>{" "}
        <span>{promedioGeneral} / 5</span>
      </div>

      {/* Tabla de evaluaciones */}
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Paciente</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Promedio Obtenido</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {evaluaciones.length > 0 ? (
            evaluaciones.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.nombre}</td>
                <td>{e.telefono}</td>
                <td>{e.fecha}</td>
                <td>{e.promedio}</td>
                <td>{e.comentario}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay evaluaciones registradas aún.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Botón volver */}
      <div className="volver-container">
        <button className="boton-volver" onClick={onVolver}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default InformeSatisfaccion;
