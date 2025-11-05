import React, { useState } from "react";
import "./AsignarCita.css";

function AsignarCita({ pacientes, medicosPorEspecialidad, onGuardar, onVolver }) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    paciente: "",
    especialidad: "",
    medico: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "especialidad" ? { medico: "" } : {}), // Reinicia médico al cambiar especialidad
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fecha ||
      !formData.hora ||
      !formData.paciente ||
      !formData.especialidad ||
      !formData.medico
    ) {
      alert("Por favor complete todos los campos antes de guardar la cita.");
      return;
    }

    onGuardar(formData);
  };

  const especialidades = [
    "Cardiología",
    "Medicina General",
    "Ginecología",
    "Pediatría",
    "Dermatología",
    "Oftalmología",
    "Traumatología",
    "Odontología",
    "Neurología",
    "Psiquiatría",
  ];

  const medicosDisponibles =
    medicosPorEspecialidad[formData.especialidad] || [];

  return (
    <div className="asignar-cita-container">
      <h2>Asignar Cita Médica</h2>

      <form className="agregar-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Fecha Cita:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Hora Cita:</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Paciente:</label>
            <select
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map((p, i) => (
                <option key={i} value={`${p.nombre} ${p.apellido}`}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Especialidad:</label>
            <select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
            >
              <option value="">Seleccione especialidad</option>
              {especialidades.map((esp, i) => (
                <option key={i} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Médico:</label>
            <select
              name="medico"
              value={formData.medico}
              onChange={handleChange}
              disabled={!formData.especialidad}
            >
              <option value="">Seleccione médico</option>
              {medicosDisponibles.length > 0 ? (
                medicosDisponibles.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))
              ) : (
                <option value="">No hay médicos disponibles</option>
              )}
            </select>
          </div>
        </div>

        <div className="acciones">
          <button type="submit">Guardar Cita</button>
          <button type="button" onClick={onVolver}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default AsignarCita;
