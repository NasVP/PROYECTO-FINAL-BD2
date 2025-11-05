import "./HistoriaClinica.css";

function HistoriaClinica({ citaSeleccionada, onVolver }) {
    return (
        <div className="historia-container">
            <h2>🩺 Historia Clínica</h2>

            <table className="tabla-datos">
                <tbody>
                    <tr>
                        <th>ID Cita</th>
                        <td>{citaSeleccionada.id_cita}</td>
                    </tr>
                    <tr>
                        <th>Fecha</th>
                        <td>{citaSeleccionada.fecha_cita}</td>
                    </tr>
                    <tr>
                        <th>Hora</th>
                        <td>{citaSeleccionada.hora_cita}</td>
                    </tr>
                    <tr>
                        <th>Cédula Paciente</th>
                        <td>{citaSeleccionada.cedula_paciente}</td>
                    </tr>
                    <tr>
                        <th>Cédula Médico</th>
                        <td>{citaSeleccionada.cedula_medico}</td>
                    </tr>
                    <tr>
                        <th>ID Especialidad</th>
                        <td>{citaSeleccionada.id_especialidad}</td>
                    </tr>
                </tbody>
            </table>

            <div className="volver-container">
                <button className="boton-volver" onClick={onVolver}>
                    Volver
                </button>
            </div>
        </div>
    );
}

export default HistoriaClinica;
