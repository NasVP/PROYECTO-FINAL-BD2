import { useState } from "react";
import "./AgregarPaciente.css";

const AgregarPaciente = ({ onVolver, onGuardar }) => {
  const [nuevoPaciente, setNuevoPaciente] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    correo: "",
    direccion: "",
    telefono: "",
    afiliacion: { nombre_afiliacion: "" },
    eps: "",
    categoria: "",
  });

  const handleAgregar = async () => {
    if (!nuevoPaciente.cedula || !nuevoPaciente.nombre || !nuevoPaciente.apellido) {
      alert("Completa los campos obligatorios: Cédula, Nombre y Apellido");
      return;
    }

    try {
      const resp = await fetch(`http://localhost:8080/paciente/findByCedula/${nuevoPaciente.cedula}`);
      if (resp.ok) {
        alert("La cédula ya existe. No se puede registrar nuevamente.");
        return;
      } 
      if (resp.status === 404) {
        onGuardar(nuevoPaciente);

        setNuevoPaciente({
          cedula: "",
          nombre: "",
          apellido: "",
          fecha_nacimiento: "",
          correo: "",
          direccion: "",
          telefono: "",
          afiliacion: { nombre_afiliacion: "" },
          eps: "",
          categoria: "",
        });
      } else {
        alert("Error al verificar cédula en el servidor");
      }
    } catch (error) {
      console.error("Error al validar cédula:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Paciente</h2>

      <input
        type="text"
        placeholder="Cédula"
        value={nuevoPaciente.cedula}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, cedula: e.target.value })}
      />

      <input
        type="text"
        placeholder="Nombre"
        value={nuevoPaciente.nombre}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
      />

      <input
        type="text"
        placeholder="Apellido"
        value={nuevoPaciente.apellido}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, apellido: e.target.value })}
      />

      <input
        type="date"
        value={nuevoPaciente.fecha_nacimiento}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, fecha_nacimiento: e.target.value })}
      />

      <input
        type="email"
        placeholder="Correo"
        value={nuevoPaciente.correo}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, correo: e.target.value })}
      />

      <input
        type="text"
        placeholder="Dirección"
        value={nuevoPaciente.direccion}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, direccion: e.target.value })}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={nuevoPaciente.telefono}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
      />

      <select
        value={nuevoPaciente.afiliacion.nombre_afiliacion}
        onChange={(e) =>
          setNuevoPaciente({
            ...nuevoPaciente,
            afiliacion: { nombre_afiliacion: e.target.value },
          })
        }
      >
        <option value="">-- Selecciona tipo de afiliación --</option>
        <option value="Afiliación EPS">Afiliación EPS</option>
        <option value="Afiliación SISBEN">Afiliación SISBEN</option>
      </select>

      {nuevoPaciente.afiliacion.nombre_afiliacion === "Afiliación EPS" && (
        <select
          value={nuevoPaciente.eps}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, eps: e.target.value })}
        >
          <option value="">-- Selecciona EPS --</option>
          <option value="Famisanar">Famisanar</option>
          <option value="Sura">Sura</option>
          <option value="Sanitas">Sanitas</option>
          <option value="Salud Total">Salud Total</option>
          <option value="Coosalud">Coosalud</option>
          <option value="Compensar">Compensar</option>
        </select>
      )}

      {nuevoPaciente.afiliacion.nombre_afiliacion === "Afiliación SISBEN" && (
        <select
          value={nuevoPaciente.categoria}
          onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, categoria: e.target.value })}
        >
          <option value="">-- Selecciona Categoría SISBEN --</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      )}

      <div className="form-botones">
        <button onClick={handleAgregar}>Guardar</button>
        <button onClick={onVolver}>Volver</button>
      </div>
    </div>
  );
};

export default AgregarPaciente;
