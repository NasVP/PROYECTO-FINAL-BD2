import { useState } from "react";
import "./Evaluacion.css";

const Evaluacion = ({ setSeccion }) => {
  const [cedula, setCedula] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [mostrarEvaluacion, setMostrarEvaluacion] = useState(false);
  const [comentario, setComentario] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [errorNoAcceso, setErrorNoAcceso] = useState(false);

  // Datos de ejemplo — reemplaza por tu fuente real
  const pacientesRegistrados = [
    { cedula: "123456789", nombre: "Juan Pérez", telefono: "3004567890" },
    { cedula: "987654321", nombre: "María Gómez", telefono: "3109876543" },
    { cedula: "111222333", nombre: "Carlos Rodríguez", telefono: "3012223344" },
  ];

  const fechaActual = new Date().toLocaleDateString();

  const preguntas = [
    "Atención del personal de recepción",
    "Trato y amabilidad del personal médico y asistencial",
    "Tiempo de espera para ser atendido",
    "Claridad en la información brindada sobre su estado de salud o tratamiento",
    "Condiciones de limpieza e higiene de las instalaciones",
    "Facilidad para programar o solicitar citas médicas",
    "Cumplimiento en los horarios de atención y citas",
    "Nivel general de satisfacción con la atención recibida en la IPS",
  ];

  const opciones = [
    { letra: "A", texto: "Excelente (5 puntos)", valor: 5 },
    { letra: "B", texto: "Buena (4 puntos)", valor: 4 },
    { letra: "C", texto: "Aceptable (3 puntos)", valor: 3 },
    { letra: "D", texto: "Deficiente (2 puntos)", valor: 2 },
    { letra: "E", texto: "Muy deficiente (1 punto)", valor: 1 },
  ];

  const navegarInicio = () => {
    if (typeof setSeccion === "function") {
      setSeccion(null);
    } else {
      window.location.href = "/";
    }
  };

  const handleBuscar = () => {
    setErrorNoAcceso(false);
    const encontrado = pacientesRegistrados.find((p) => p.cedula === cedula.trim());
    if (encontrado) {
      setPaciente(encontrado);
      setMostrarEvaluacion(true);
    } else {
      setErrorNoAcceso(true);
      setPaciente(null);
      setMostrarEvaluacion(false);
    }
  };

  const handleSeleccion = (pregunta, letra) => {
    setRespuestas({ ...respuestas, [pregunta]: letra });
  };

  const handleEnviar = () => {
    if (Object.keys(respuestas).length !== preguntas.length) {
      alert("⚠️ Debe responder todas las preguntas antes de enviar la evaluación.");
      return;
    }

    // Calcular puntaje promedio
    let total = 0;
    for (const r of Object.values(respuestas)) {
      const valor = opciones.find((o) => o.letra === r)?.valor || 0;
      total += valor;
    }
    const promedio = (total / preguntas.length).toFixed(2);

    // Crear objeto evaluación
    const nuevaEvaluacion = {
      id: Date.now(),
      nombre: paciente.nombre,
      telefono: paciente.telefono,
      fecha: fechaActual,
      promedio,
      comentario,
    };

    // Guardar en localStorage
    const guardadas = JSON.parse(localStorage.getItem("evaluaciones")) || [];
    guardadas.push(nuevaEvaluacion);
    localStorage.setItem("evaluaciones", JSON.stringify(guardadas));

    alert("✅ Evaluación enviada correctamente. ¡Gracias por su opinión!");

    // limpiar y volver al inicio
    setComentario("");
    setRespuestas({});
    setMostrarEvaluacion(false);
    setPaciente(null);
    setCedula("");
    navegarInicio();
  };

  const handleVolver = () => {
    setMostrarEvaluacion(false);
    setPaciente(null);
    setCedula("");
    setErrorNoAcceso(false);
    navegarInicio();
  };

  return (
    <div className="evaluacion-pantalla">
      {/* Pantalla de búsqueda / acceso */}
      {!mostrarEvaluacion && !errorNoAcceso && (
        <div className="form-evaluacion">
          <h2>Acceso a Evaluación</h2>
          <p>Por favor ingrese su número de cédula para continuar:</p>

          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ingrese su cédula"
          />

          <div className="botones">
            <button className="btn-enviar" onClick={handleBuscar}>
              Buscar
            </button>
            <button className="btn-volver" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Usuario no autorizado */}
      {errorNoAcceso && (
        <div className="form-evaluacion">
          <h2>Acceso denegado</h2>
          <p>❌ No puede acceder a la evaluación. El paciente no está registrado o no ha sido atendido.</p>
          <div className="botones">
            <button className="btn-volver" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Formulario de evaluación */}
      {mostrarEvaluacion && paciente && (
        <div className="evaluacion-formulario">
          <h2>EVALUACIÓN DE ATENCIÓN EN LA IPS</h2>

          <p className="instrucciones">
            <strong>Instrucciones:</strong><br />
            Seleccione la opción que mejor describa su experiencia en la IPS.<br />
            Cada respuesta tiene una puntuación asignada:<br />
            <strong>A = 5 puntos, B = 4 puntos, C = 3 puntos, D = 2 puntos, E = 1 punto</strong>
          </p>

          <div className="datos-paciente">
            <p><strong>Nombre:</strong> {paciente.nombre}</p>
            <p><strong>Teléfono:</strong> {paciente.telefono}</p>
            <p><strong>Fecha:</strong> {fechaActual}</p>
          </div>

          <div className="preguntas-lista">
            {preguntas.map((pregunta, i) => (
              <div key={i} className="pregunta">
                <p><strong>{i + 1}. {pregunta}</strong></p>
                {opciones.map((op) => (
                  <label key={op.letra}>
                    <input
                      type="radio"
                      name={pregunta}
                      value={op.letra}
                      checked={respuestas[pregunta] === op.letra}
                      onChange={() => handleSeleccion(pregunta, op.letra)}
                    />
                    {op.texto}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="comentario">
            <label>🗒️ Comentarios y sugerencias:</label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escriba aquí sus observaciones o sugerencias..."
            />
          </div>

          <div className="botones">
            <button className="btn-enviar" onClick={handleEnviar}>
              Enviar
            </button>
            <button className="btn-volver" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluacion;
