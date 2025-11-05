import { useState } from "react";
import "./CancelarCita.css";

function CancelarCita({ citas, setCitas, onVolver }) {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const handleSeleccionar = (cita) => {
    setCitaSeleccionada(cita);
  };

  const handleCancelar = () => {
    if (!citaSeleccionada) {
      alert("Por favor seleccione una cita para cancelar.");
      return;
    }

    const confirmar = window.confirm(
      `¿Seguro que desea cancelar la cita del paciente ${citaSeleccionada.paciente} con el médico ${citaSeleccionada.medico}?`
    );

    if (confirmar) {
      const citasActualizadas = citas.filter(
        (c) => c.id !== citaSeleccionada.id
      );
      setCitas(citasActualizadas);
      setCitaSeleccionada(null);
      alert("Cita cancelada correctamente ✅");
    }
  };

  return (
    <div className="cancelar-cita-container">
      <h2>Cancelar Cita</h2>

      <table className="tabla-citas">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Tipo Afiliación</th>
            <th>EPS / Categoría</th>
          </tr>
        </thead>
        <tbody>
          {citas.length === 0 ? (
            <tr>
              <td colSpan="8">No hay citas registradas</td>
            </tr>
          ) : (
            citas.map((cita) => (
              <tr
                key={cita.id}
                className={
                  citaSeleccionada && citaSeleccionada.id === cita.id
                    ? "fila-seleccionada"
                    : ""
                }
              >
                <td>
                  <input
                    type="radio"
                    name="seleccionCita"
                    onChange={() => handleSeleccionar(cita)}
                    checked={citaSeleccionada?.id === cita.id}
                  />
                </td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.tipoAfiliacion}</td>
                <td>
                  {cita.tipoAfiliacion === "EPS"
                    ? cita.eps
                    : cita.categoria}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="acciones">
        <button
          className="boton-cancelar"
          onClick={handleCancelar}
          disabled={!citaSeleccionada}
        >
          Cancelar Cita
        </button>

        <button className="boton-volver" onClick={onVolver}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default CancelarCita;
