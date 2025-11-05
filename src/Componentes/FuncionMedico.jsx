import React, { useState } from "react";
import "./FuncionMedico.css";
import medicoImg from "../Imagenes/medico.jpg";

export default function FuncionMedico() {
    const [seccion, setSeccion] = useState(null);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [mostrarHistoria, setMostrarHistoria] = useState(false);
    const [modoLectura, setModoLectura] = useState(false);

    const [historia, setHistoria] = useState({
        diagnostico: "",
        concepto: "",
        tratamiento: "",
    });

    const [citas, setCitas] = useState([
        {
            id_cita: 1,
            fecha_cita: "2025-11-04",
            hora_cita: "08:30",
            costo_cita: "$50.000",
            cedula_paciente: "10101010",
            cedula_medico: "20202020",
            id_especialidad: "01",
            estado: "En espera",
            historia: null,
        },
        {
            id_cita: 2,
            fecha_cita: "2025-11-04",
            hora_cita: "09:00",
            costo_cita: "$70.000",
            cedula_paciente: "30303030",
            cedula_medico: "20202020",
            id_especialidad: "02",
            estado: "En espera",
            historia: null,
        },
    ]);

    const guardarHistoriaClinica = () => {
        alert("Historia clínica guardada correctamente ✅");
        setCitas((prev) =>
            prev.map((cita) =>
                cita.id_cita === citaSeleccionada.id_cita
                    ? {
                        ...cita,
                        estado: "Atendido",
                        historia: { ...historia },
                    }
                    : cita
            )
        );
        setMostrarHistoria(false);
        setHistoria({ diagnostico: "", concepto: "", tratamiento: "" });
        setCitaSeleccionada(null);
    };

    const renderContenido = () => {
        if (!seccion) {
            return (
                <h2>
                    Seleccione una funcionalidad del panel izquierdo del módulo médico
                </h2>
            );
        }

        if (seccion === "citas") return renderCitas();
        if (seccion === "atendidos") return renderPacientesAtendidos();
        if (seccion === "canceladas") return renderCitasCanceladas();
    };

    // === Render Citas Asignadas ===
    const renderCitas = () => {
        if (mostrarHistoria && citaSeleccionada) {
            return renderFormularioHistoria();
        }

        return (
            <div>
                <h2>Citas Asignadas</h2>
                <table className="tabla-datos">
                    <thead>
                        <tr>
                            <th>ID Cita</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Costo</th>
                            <th>Cédula Paciente</th>
                            <th>Cédula Médico</th>
                            <th>ID Especialidad</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr
                                key={cita.id_cita}
                                onClick={() => setCitaSeleccionada(cita)}
                                className={
                                    citaSeleccionada?.id_cita === cita.id_cita
                                        ? "fila-seleccionada"
                                        : ""
                                }
                            >
                                <td>{cita.id_cita}</td>
                                <td>{cita.fecha_cita}</td>
                                <td>{cita.hora_cita}</td>
                                <td>{cita.costo_cita}</td>
                                <td>{cita.cedula_paciente}</td>
                                <td>{cita.cedula_medico}</td>
                                <td>{cita.id_especialidad}</td>
                                <td>{cita.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="acciones">
                    <button
                        onClick={() => {
                            if (!citaSeleccionada) {
                                alert("Por favor seleccione una cita primero");
                                return;
                            }
                            setModoLectura(false);
                            setMostrarHistoria(true);
                        }}
                    >
                        Crear Historia Clínica
                    </button>
                </div>

                <div className="volver-container">
                    <button className="boton-volver" onClick={() => setSeccion(null)}>
                        Volver
                    </button>
                </div>
            </div>
        );
    };

    const renderFormularioHistoria = () => (
        <div className="formulario-historia">
            <h2>Historia Clínica</h2>
            <p><strong>Cédula:</strong> {citaSeleccionada.cedula_paciente}</p>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Fecha Nacimiento:</strong> 1990-02-10</p>
            <p><strong>Teléfono:</strong> 3001234567</p>
            <p><strong>Dirección:</strong> Calle 10 #5-23</p>
            <p><strong>Régimen:</strong> Contributivo</p>

            <label><h3>Diagnóstico:</h3></label>
            <textarea
                value={historia.diagnostico}
                onChange={(e) =>
                    setHistoria({ ...historia, diagnostico: e.target.value })
                }
                readOnly={modoLectura}
            />
            <label><h3>Concepto:</h3></label>
            <textarea
                value={historia.concepto}
                onChange={(e) =>
                    setHistoria({ ...historia, concepto: e.target.value })
                }
                readOnly={modoLectura}
            />
            <label><h3>Tratamiento:</h3></label>
            <textarea
                value={historia.tratamiento}
                onChange={(e) =>
                    setHistoria({ ...historia, tratamiento: e.target.value })
                }
                readOnly={modoLectura}
            />

            <h3>Firma del Médico</h3>
            <p><strong>Nombre:</strong> Dr. Andrés Martínez</p>
            <p><strong>Tarjeta Profesional:</strong> 458723</p>
            <p><strong>Especialidad:</strong> Medicina General</p>

            <div className="acciones">
                {!modoLectura && (
                    <button onClick={guardarHistoriaClinica}>
                        Guardar Historia Clínica
                    </button>
                )}
                <button
                    className="boton-volver"
                    onClick={() => setMostrarHistoria(false)}
                >
                    Volver a Citas
                </button>
            </div>
        </div>
    );

    const renderPacientesAtendidos = () => {
        const atendidos = citas.filter((c) => c.estado === "Atendido");

        return (
            <div>
                <h2>Pacientes Atendidos</h2>
                {atendidos.length === 0 ? (
                    <p>No hay pacientes atendidos todavía.</p>
                ) : (
                    <table className="tabla-datos">
                        <thead>
                            <tr>
                                <th>ID Cita</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atendidos.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.id_cita}</td>
                                    <td>{cita.fecha_cita}</td>
                                    <td>{cita.hora_cita}</td>
                                    <td>{cita.cedula_paciente}</td>
                                    <td>{cita.estado}</td>
                                    <td>
                                        <button
                                            className="boton-ver-historia"
                                            onClick={() => {
                                                setCitaSeleccionada(cita);
                                                setHistoria(cita.historia || {});
                                                setModoLectura(true);
                                                setMostrarHistoria(true);
                                            }}
                                        >
                                            Ver Historia
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="volver-container">
                    <button className="boton-volver" onClick={() => setSeccion(null)}>
                        Volver
                    </button>
                </div>
            </div>
        );
    };

    const renderCitasCanceladas = () => {
        const canceladas = citas.filter((c) => c.estado === "Cancelada");

        return (
            <div>
                <h2>Citas Canceladas</h2>
                {canceladas.length === 0 ? (
                    <p>No hay citas canceladas.</p>
                ) : (
                    <table className="tabla-datos">
                        <thead>
                            <tr>
                                <th>ID Cita</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {canceladas.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.id_cita}</td>
                                    <td>{cita.fecha_cita}</td>
                                    <td>{cita.hora_cita}</td>
                                    <td>{cita.cedula_paciente}</td>
                                    <td>{cita.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="volver-container">
                    <button className="boton-volver" onClick={() => setSeccion(null)}>
                        Volver
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="panel-container">
            <aside className="panel-lateral">
                <div className="imagen-medico">
                    <img src={medicoImg} alt="Médico" />
                </div>

                <div className="panel-rol">
                    <h3>Médico</h3>
                </div>

                <div className="panel-botones">
                    <button onClick={() => setSeccion("citas")}>Citas Asignadas</button>
                    <button onClick={() => setSeccion("atendidos")}>Pacientes Atendidos</button>
                    <button onClick={() => setSeccion("canceladas")}>Citas Canceladas</button>
                </div>

                <button
                    className="boton-volver-mini"
                    onClick={() => (window.location.href = "/")}
                >
                    Volver
                </button>
            </aside>

            <main className="panel-contenido">
                {mostrarHistoria ? renderFormularioHistoria() : renderContenido()}
            </main>
        </div>
    );
}