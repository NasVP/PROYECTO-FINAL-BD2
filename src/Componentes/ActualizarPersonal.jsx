import { useState } from "react";
import "./ActualizarPersonal.css";

function ActualizarPersonal({ personalSeleccionado, setPersonal, onVolver }) {
  // Estado local con los datos editables
  const [formData, setFormData] = useState({
    telefono: personalSeleccionado.telefono || "",
    correo: personalSeleccionado.correo || "",
    direccion: personalSeleccionado.direccion || "",
    contrasena: "",
  });

  // Manejo del cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular actualización local (en tu caso podrías hacer fetch/axios al backend)
    setPersonal((prev) =>
      prev.map((p) =>
        p.id === personalSeleccionado.id
          ? { ...p, ...formData }
          : p
      )
    );

    alert("Datos actualizados correctamente");
    onVolver(); // volver al panel principal
  };

  return (
    <div className="formulario-container">
      <h2>Actualizar Personal</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            placeholder={personalSeleccionado.nombre}
            disabled
          />
        </div>

        {/* Apellido */}
        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            placeholder={personalSeleccionado.apellido || "No registrado"}
            disabled
          />
        </div>

        {/* Cédula */}
        <div className="campo">
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            placeholder={personalSeleccionado.cedula || "No registrado"}
            disabled
          />
        </div>

        {/* Rol */}
        <div className="campo">
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            placeholder={personalSeleccionado.rol || "No asignado"}
            disabled
          />
        </div>

        {/* Tarjeta profesional (solo si es médico) */}
        {personalSeleccionado.rol?.toLowerCase() === "medico" && (
          <div className="campo">
            <label>Tarjeta Profesional:</label>
            <input
              type="text"
              name="tarjetaProfesional"
              placeholder={personalSeleccionado.tarjetaProfesional || "No registrada"}
              disabled
            />
          </div>
        )}

        {/* Usuario */}
        <div className="campo">
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            placeholder={personalSeleccionado.usuario || "No asignado"}
            disabled
          />
        </div>

        {/* Teléfono */}
        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            placeholder={personalSeleccionado.telefono || "Ingrese nuevo número"}
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        {/* Correo */}
        <div className="campo">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            placeholder={personalSeleccionado.correo || "Ingrese nuevo correo"}
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        {/* Dirección */}
        <div className="campo">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            placeholder={personalSeleccionado.direccion || "Ingrese nueva dirección"}
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        {/* Contraseña */}
        <div className="campo">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            placeholder="Ingrese nueva contraseña (opcional)"
            value={formData.contrasena}
            onChange={handleChange}
          />
        </div>

        {/* Botones */}
        <div className="botones-form">
          <button type="submit" className="btn-guardar">Guardar Cambios</button>
          <button type="button" className="btn-volver" onClick={onVolver}>Volver</button>
        </div>
      </form>
    </div>
  );
}

export default ActualizarPersonal;
