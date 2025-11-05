import { useState } from "react";
import "./ActualizarCita.css";

function ActualizarCita({ citas, setCitas, onVolver }) {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [citaEditada, setCitaEditada] = useState({
    fecha: "",
    hora: "",
    especialidad: "",
    medico: "",
  });

  const medicosPorEspecialidad = {
    Cardiologia: ["Dr. Juan Pérez", "Dra. Laura Gómez"],
    "Medicina General": ["Dr. Carlos Ruiz", "Dra. Marta Sánchez"],
    Ginecologia: ["Dra. Andrea Torres", "Dr. Pablo Medina"],
    Pediatria: ["Dr. Jorge Ramírez", "Dra. Natalia Díaz"],
    Dermatologia: ["Dra. Carolina Restrepo", "Dr. Felipe Mora"],
    Oftalmologia: ["Dr. Ricardo Silva", "Dra. Liliana Castaño"],
    Traumatologia: ["Dr. Esteban López", "Dra. Verónica Ramos"],
    Odontologia: ["Dr. Julián Vega", "Dra. Paula Herrera"],
    Neurologia: ["Dr. Daniel Orozco", "Dra. Sara Jiménez"],
    Psiquiatria: ["Dr. Miguel Andrade", "Dra. Ángela Torres"],
  };

  const handleSeleccionar = (cita) => {
    setCitaSeleccionada(cita);
    setCitaEditada({
      fecha: cita.fecha,
      hora: cita.hora,
      especialidad: cita.especialidad,
      medico: cita.medico,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitaEditada({ ...citaEditada, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();

    const citasActualizadas = citas.map((c) =>
      c.id === citaSeleccionada.id
        ? { ...c, ...citaEditada }
        : c
    );

    setCitas(citasActualizadas);
    alert("Cita actualizada correctamente ✅");
    setCitaSeleccionada(null);
  };

  return (
    <div className="actualizar-cita-container">
      <h2>Modificar Cita</h2>

      {!citaSeleccionada ? (
        <>
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Tipo Afiliación</th>
                <th>EPS / Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td colSpan="8">No hay citas registradas</td>
                </tr>
              ) : (
                citas.map((c, i) => (
                  <tr key={i}>
                    <td>{c.fecha}</td>
                    <td>{c.hora}</td>
                    <td>{c.paciente}</td>
                    <td>{c.medico}</td>
                    <td>{c.especialidad}</td>
                    <td>{c.tipoAfiliacion}</td>
                    <td>
                      {c.tipoAfiliacion === "EPS"
                        ? c.eps
                        : c.categoria}
                    </td>
                    <td>
                      <button
                        className="btn-modificar"
                        onClick={() => handleSeleccionar(c)}
                      >
                        Modificar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="volver-centro">
            <button className="boton-volver" onClick={onVolver}>
              Volver
            </button>
          </div>
        </>
      ) : (
        <form className="form-actualizar" onSubmit={handleGuardar}>
          <div className="form-grid">
            <div>
              <label>Paciente:</label>
              <input
                type="text"
                value={citaSeleccionada.paciente}
                readOnly
              />
            </div>

            <div>
              <label>Tipo de Afiliación:</label>
              <input
                type="text"
                value={citaSeleccionada.tipoAfiliacion}
                readOnly
              />
            </div>

            <div>
              <label>Fecha Cita:</label>
              <input
                type="date"
                name="fecha"
                value={citaEditada.fecha}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Hora Cita:</label>
              <input
                type="time"
                name="hora"
                value={citaEditada.hora}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Especialidad:</label>
              <select
                name="especialidad"
                value={citaEditada.especialidad}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                {Object.keys(medicosPorEspecialidad).map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Médico:</label>
              <select
                name="medico"
                value={citaEditada.medico}
                onChange={handleChange}
              >
                <option value="">Seleccione Médico</option>
                {citaEditada.especialidad &&
                  medicosPorEspecialidad[citaEditada.especialidad]?.map(
                    (medico) => (
                      <option key={medico} value={medico}>
                        {medico}
                      </option>
                    )
                  )}
              </select>
            </div>
          </div>

          <div className="acciones">
            <button type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="boton-cancelar"
              onClick={() => setCitaSeleccionada(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ActualizarCita;
