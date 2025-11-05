import { useState } from "react";
import "./ActualizarPaciente.css";

function ActualizarPaciente({ paciente, onActualizar, onCancelar }) {
  const [datos, setDatos] = useState({
    cedula: paciente.cedula,
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    fechaNacimiento: paciente.fechaNacimiento,
    correo: paciente.correo,
    direccion: paciente.direccion,
    telefono: paciente.telefono,
    tipoAfiliacion: paciente.tipoAfiliacion,
    eps: paciente.eps || "",
    categoria: paciente.categoria || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onActualizar(datos);
  };

  return (
    <div className="actualizar-container">
      <h2>Actualizar Paciente</h2>

      <form onSubmit={handleSubmit} className="actualizar-form">
        <div className="form-grid">
          <div>
            <label>Cédula:</label>
            <input
              type="text"
              name="cedula"
              value={datos.cedula}
              disabled
              readOnly
            />
          </div>

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              disabled
              readOnly
            />
          </div>

          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={datos.apellido}
              disabled
              readOnly
            />
          </div>

          <div>
            <label>Fecha Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={datos.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={datos.correo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={datos.direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tipo de Afiliación:</label>
            <select
              name="tipoAfiliacion"
              value={datos.tipoAfiliacion}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="EPS">EPS</option>
              <option value="SISBEN">SISBEN</option>
            </select>
          </div>

          {datos.tipoAfiliacion === "EPS" && (
            <div>
              <label>EPS:</label>
              <select
                name="eps"
                value={datos.eps}
                onChange={handleChange}
              >
                <option value="">Seleccione EPS</option>
                <option value="Famisanar">Famisanar</option>
                <option value="Sura">Sura</option>
                <option value="Sanitas">Sanitas</option>
                <option value="Salud Total">Salud Total</option>
                <option value="Coosalud">Coosalud</option>
                <option value="Compensar">Compensar</option>
              </select>
            </div>
          )}

          {datos.tipoAfiliacion === "SISBEN" && (
            <div>
              <label>Categoría:</label>
              <select
                name="categoria"
                value={datos.categoria}
                onChange={handleChange}
              >
                <option value="">Seleccione Categoría</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          )}
        </div>

        <div className="acciones">
          <button type="submit" className="btn-actualizar">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActualizarPaciente;
