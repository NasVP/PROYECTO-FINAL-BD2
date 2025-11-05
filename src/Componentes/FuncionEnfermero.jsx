import { useState, useEffect } from "react";
import "./FuncionEnfermero.css";
import enfermero from "../Imagenes/enfermero.jpg";
import ActualizarPaciente from "./ActualizarPaciente";
import AgregarPaciente from "./AgregarPaciente"; // ✅ importamos el nuevo componente
import AsignarCita from "./AsignarCita";
import ActualizarCita from "./ActualizarCita";
import CancelarCita from "./CancelarCita";

function FuncionEnfermero() {
  const [seccion, setSeccion] = useState(null);
  const [modo, setModo] = useState(null);

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/paciente/getAll")
      .then((response) => response.json())
      .then((data) => setPacientes(data))
      .catch((error) => console.error("Error al cargar pacientes:", error));
  }, []);

  const [ingreso, setIngreso] = useState({
    cedula: "",
    fecha: "",
    hora: "",
  });

  const [facturas, setFacturas] = useState([]);
  const [citas, setCitas] = useState([]);

  const [mostrarAsignarCita, setMostrarAsignarCita] = useState(false);
  const [mostrarActualizarCita, setMostrarActualizarCita] = useState(false);
  const [mostrarCancelarCita, setMostrarCancelarCita] = useState(false);

  const medicosPorEspecialidad = {
    Cardiología: ["Dr. Fernández", "Dra. Ruiz"],
    "Medicina General": ["Dr. Pérez", "Dra. Gómez"],
    Ginecología: ["Dra. López", "Dra. Castro"],
    Pediatría: ["Dr. Morales", "Dra. Silva"],
    Dermatología: ["Dra. Pardo", "Dr. Ríos"],
    Oftalmología: ["Dr. Ramírez", "Dra. Suárez"],
    Traumatología: ["Dr. Varela", "Dra. Beltrán"],
    Odontología: ["Dr. Herrera", "Dra. Cruz"],
    Neurología: ["Dr. Núñez", "Dra. Cárdenas"],
    Psiquiatría: ["Dra. Torres", "Dr. Benítez"],
  };

  // ---------------------------
  // NUEVO: Función para guardar paciente con validación de cédula
  // ---------------------------
  const guardarPaciente = async (paciente) => {
    try {
      // Primero verificamos si la cédula ya existe en backend
      const resp = await fetch(
        `http://localhost:8080/paciente/findByCedula/${paciente.cedula}`
      );

      if (resp.ok) {
        alert("La cédula ya existe. No se puede registrar nuevamente.");
        return;
      }

      if (resp.status === 404) {
        // Cédula no existe, se puede guardar
        const pacienteParaGuardar = {
          ...paciente,
          afiliacion: {
            nombre_afiliacion: paciente.afiliacion.nombre_afiliacion,
            eps:
              paciente.afiliacion.nombre_afiliacion === "EPS"
                ? { nombre_eps: paciente.eps }
                : null,
            sisben:
              paciente.afiliacion.nombre_afiliacion === "SISBEN"
                ? { categoria_sisben: paciente.categoria }
                : null,
          },
        };

        const saveResp = await fetch(
          "http://localhost:8080/paciente/savePaciente",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pacienteParaGuardar),
          }
        );

        if (saveResp.ok) {
          const nuevo = await saveResp.json();
          setPacientes([...pacientes, nuevo]);
          alert("Paciente agregado correctamente");
          setModo(null);
        } else {
          alert("Error al guardar el paciente en el servidor");
        }
      }
    } catch (error) {
      console.error("Error al procesar el paciente:", error);
      alert("Ocurrió un error al verificar o guardar el paciente");
    }
  };

  // ---------------------------
  // Otras funciones existentes se mantienen igual
  // ---------------------------
  const handleEliminar = (cedula) => {
    const confirmacion = window.confirm("¿Desea eliminar este paciente?");
    if (confirmacion) {
      setPacientes(pacientes.filter((p) => p.cedula !== cedula));
    }
  };

  const handleGenerarIngreso = () => {
    if (!ingreso.cedula) {
      alert("Debe ingresar la cédula para generar el ingreso");
      return;
    }

    const paciente = pacientes.find((p) => p.cedula === ingreso.cedula);
    if (!paciente) {
      alert("El paciente no existe. Debe registrarlo primero.");
      return;
    }

    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString();
    const hora = fechaActual.toLocaleTimeString();

    const nuevoIngreso = {
      cedula: ingreso.cedula,
      fecha,
      hora,
    };

    setIngreso(nuevoIngreso);

    const nuevaFactura = {
      id_factura: Date.now(),
      tipo: "Ingreso Paciente",
      fechaEmision: fecha,
      valor: 50000,
      estadoPago: "Pendiente",
      id_ingreso: ingreso.cedula + "-" + Date.now(),
      fechaReferencia: fecha,
    };

    setFacturas([...facturas, nuevaFactura]);

    alert(
      `Ingreso generado correctamente.\nFactura creada con ID: ${nuevaFactura.id_factura}`
    );
    setModo(null);
    setIngreso({ cedula: "", fecha: "", hora: "" });
  };

  const handleIniciarActualizar = () => {
    const ced = window.prompt("Ingrese la cédula del paciente a actualizar:");
    if (!ced) {
      return;
    }
    const p = pacientes.find((x) => x.cedula === ced);
    if (!p) {
      alert("Paciente no encontrado");
      return;
    }

    setModo("actualizar");
    setNuevoPaciente({
      cedula: p.cedula || "",
      nombre: p.nombre || "",
      apellido: p.apellido || "",
      fecha_nacimiento: p.fecha_nacimiento || "",
      correo: p.correo || "",
      direccion: p.direccion || "",
      telefono: p.telefono || "",
      tipo_afiliacion: p.afiliacion?.nombre_afiliacion || "",
      eps: p.eps || "",
      categoria: p.categoria || "",
    });
  };

  // ---------------------------
  // Render pacientes
  // ---------------------------
  const renderPacientes = () => {
    if (modo === "actualizar") {
      return (
        <ActualizarPaciente
          pacientes={pacientes}
          setPacientes={setPacientes}
          onVolver={() => setModo(null)}
        />
      );
    }

    if (modo === "agregar") {
      // ✅ ahora renderizamos el componente externo de agregar
      return <AgregarPaciente onGuardar={guardarPaciente} onVolver={() => setModo(null)} />;
    }

    if (modo === "ingreso") {
      return (
        <div className="agregar-paciente-container">
          <h2>Gestión de Ingreso</h2>
          <form className="agregar-form">
            <div className="form-grid">
              <div>
                <label>Cédula:</label>
                <input
                  type="text"
                  name="cedula"
                  value={ingreso.cedula}
                  onChange={(e) =>
                    setIngreso({ ...ingreso, cedula: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="acciones">
              <button
                type="button"
                onClick={handleGenerarIngreso}
                className="btn-generar"
              >
                Generar Ingreso
              </button>
            </div>

            <div className="volver-centro">
              <button
                type="button"
                className="boton-volver"
                onClick={() => setModo(null)}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      );
    }

    // Tabla principal de pacientes
    return (
      <div>
        <h2>Gestión de Pacientes</h2>

        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha Nacimiento</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Tipo Afiliación</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={i}>
                <td>{p.cedula}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.fecha_nacimiento}</td>
                <td>{p.correo}</td>
                <td>{p.direccion}</td>
                <td>{p.telefono}</td>
                <td>{p.afiliacion?.nombre_afiliacion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="acciones">
          <button onClick={() => setModo("agregar")}>Agregar</button>
          <button onClick={handleIniciarActualizar}>Actualizar</button>
          <button onClick={() => alert("Eliminar no implementado aún")}>
            Eliminar
          </button>
          <button onClick={() => setModo("ingreso")}>Ingreso</button>
        </div>

        <div className="volver-centro">
          <button className="boton-volver" onClick={() => setSeccion(null)}>
            Volver
          </button>
        </div>
      </div>
    );
  };

  // ---------------------------
  // Render citas (sin cambios)
  // ---------------------------
  const renderCitas = () => {
    if (mostrarAsignarCita) {
      return (
        <AsignarCita
          pacientes={pacientes}
          medicosPorEspecialidad={medicosPorEspecialidad}
          onGuardar={(nuevaCita) => {
            setCitas([...citas, { id: Date.now(), ...nuevaCita }]);
            alert("Cita asignada correctamente");
            setMostrarAsignarCita(false);
          }}
          onVolver={() => setMostrarAsignarCita(false)}
        />
      );
    }

    if (mostrarActualizarCita) {
      return (
        <ActualizarCita
          citas={citas}
          setCitas={setCitas}
          pacientes={pacientes}
          medicosPorEspecialidad={medicosPorEspecialidad}
          onVolver={() => setMostrarActualizarCita(false)}
        />
      );
    }

    if (mostrarCancelarCita) {
      return (
        <CancelarCita
          citas={citas}
          setCitas={setCitas}
          onVolver={() => setMostrarCancelarCita(false)}
        />
      );
    }

    return (
      <div>
        <h2>Gestión de Citas Médicas</h2>
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Fecha Cita</th>
              <th>Hora Cita</th>
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
                <td colSpan="7">No hay citas registradas</td>
              </tr>
            ) : (
              citas.map((c, i) => {
                const paciente = pacientes.find(
                  (p) => `${p.nombre} ${p.apellido}` === c.paciente
                );
                return (
                  <tr key={i}>
                    <td>{c.fecha}</td>
                    <td>{c.hora}</td>
                    <td>{c.paciente}</td>
                    <td>{c.medico}</td>
                    <td>{c.especialidad}</td>
                    <td>{paciente ? paciente.tipo_afiliacion : "-"}</td>
                    <td>
                      {paciente
                        ? paciente.tipo_afiliacion === "EPS"
                          ? paciente.eps
                          : paciente.categoria
                        : "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="acciones">
          <button onClick={() => setMostrarAsignarCita(true)}>Asignar Cita</button>
          <button onClick={() => setMostrarCancelarCita(true)}>Cancelar Cita</button>
          <button onClick={() => setMostrarActualizarCita(true)}>Modificar Cita</button>
        </div>

        <div className="volver-centro">
          <button className="boton-volver" onClick={() => setSeccion(null)}>
            Volver
          </button>
        </div>
      </div>
    );
  };

  // ---------------------------
  // Render principal
  // ---------------------------
  return (
    <div className="panel-container">
      <aside className="panel-lateral">
        <div className="imagen-rol">
          <img src={enfermero} alt="Enfermero" />
        </div>
        <div className="panel-rol">
          <h3>Enfermeria</h3>
        </div>
        <div className="panel-botones">
          <button onClick={() => setSeccion("pacientes")}>Gestión Pacientes</button>
          <button onClick={() => setSeccion("citas")}>Gestión Citas Médicas</button>
        </div>
        <button
          className="boton-volver-mini"
          onClick={() => (window.location.href = "/")}
        >
          Volver
        </button>
      </aside>

      <main className="panel-contenido">
        {!seccion && <h2>Seleccione una funcionalidad del módulo enfermero</h2>}
        {seccion === "pacientes" && renderPacientes()}
        {seccion === "citas" && renderCitas()}
        {modo === "actualizar" && seccion !== "pacientes" && (
          <ActualizarPaciente
            pacientes={pacientes}
            setPacientes={setPacientes}
            onVolver={() => setModo(null)}
          />
        )}
      </main>
    </div>
  );
}

export default FuncionEnfermero;
