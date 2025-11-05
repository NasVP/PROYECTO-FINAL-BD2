import { useState } from "react";
import "./AgregarPersonal.css";

const AgregarPersonal = ({ personal, setPersonal, onVolver }) => {
  const [rolSeleccionado, setRolSeleccionado] = useState("");
  const [nuevoPersonal, setNuevoPersonal] = useState({
    usuario: "",
    contrasena: "",
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    tarjetaProfesional: "", // solo para médicos
  });

  const handleAgregar = () => {
    // Validar campos obligatorios
    let camposObligatorios = [
      "usuario",
      "contrasena",
      "cedula",
      "nombre",
      "apellido",
      "correo",
      "telefono",
    ];
    if (rolSeleccionado === "medico") {
      camposObligatorios.push("tarjetaProfesional");
    }

    for (let campo of camposObligatorios) {
      if (!nuevoPersonal[campo]) {
        alert("Completa todos los campos obligatorios");
        return;
      }
    }

    // Generar ID autoincremental
    const nuevoId =
      personal.length > 0 ? personal[personal.length - 1].id + 1 : 1;

    // Agregar nuevo personal
    setPersonal([
      ...personal,
      { id: nuevoId, cargo: rolSeleccionado, ...nuevoPersonal },
    ]);

    alert("Personal agregado correctamente");

    // Reiniciar formulario
    setNuevoPersonal({
      usuario: "",
      contrasena: "",
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      tarjetaProfesional: "",
    });
    setRolSeleccionado("");
  };

  return (
    <div className="form-container">
      <h2>Agregar Personal</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={nuevoPersonal.usuario}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, usuario: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={nuevoPersonal.contrasena}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, contrasena: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Cédula"
        value={nuevoPersonal.cedula}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, cedula: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Nombre"
        value={nuevoPersonal.nombre}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, nombre: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Apellido"
        value={nuevoPersonal.apellido}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, apellido: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Correo"
        value={nuevoPersonal.correo}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, correo: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={nuevoPersonal.telefono}
        onChange={(e) =>
          setNuevoPersonal({ ...nuevoPersonal, telefono: e.target.value })
        }
      />

      <select
        value={rolSeleccionado}
        onChange={(e) => setRolSeleccionado(e.target.value)}
      >
        <option value="">-- Selecciona un rol --</option>
        <option value="medico">Médico</option>
        <option value="enfermero">Enfermero</option>
        <option value="administrativo">Administrativo</option>
      </select>

      {rolSeleccionado === "medico" && (
        <input
          type="text"
          placeholder="Tarjeta Profesional"
          value={nuevoPersonal.tarjetaProfesional}
          onChange={(e) =>
            setNuevoPersonal({
              ...nuevoPersonal,
              tarjetaProfesional: e.target.value,
            })
          }
        />
      )}

      <div className="form-botones">
        <button onClick={handleAgregar}>Guardar</button>
        <button onClick={onVolver}>Volver</button>
      </div>
    </div>
  );
};

export default AgregarPersonal;
