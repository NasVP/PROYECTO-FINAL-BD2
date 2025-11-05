import { useState } from "react";
import "./GenerarReporte.css";

const GenerarReporte = ({ reportes, setReportes, onVolver }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoReporte, setTipoReporte] = useState(""); // EPS o SISBEN
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(""); // EPS o categoría
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const epsOptions = [
    "Sanitas",
    "Compensar",
    "Nueva EPS",
    "Sura",
    "Famisanar",
    "Medimás",
    "Salud Total",
    "Coosalud",
  ];

  const sisbenCategorias = ["A", "B", "C", "D"];

  const handleGenerarReporte = () => {
    if (!fechaInicio || !fechaFin || !tipoReporte || !opcionSeleccionada) {
      alert("⚠️ Por favor complete todos los campos antes de generar el reporte.");
      return;
    }

    const nuevoReporte = {
      id: reportes.length + 1,
      nombre: `Ganancias ${tipoReporte} - ${opcionSeleccionada}`,
      fechaInicio,
      fechaFin,
      tipo: tipoReporte,
      aseguradora: opcionSeleccionada,
      fechaCreacion: new Date().toISOString().split("T")[0],
      responsable: "Administrador",
    };

    setReportes([...reportes, nuevoReporte]);
    setFechaInicio("");
    setFechaFin("");
    setTipoReporte("");
    setAseguradoraSeleccionada("");
    alert("Reporte generado y guardado correctamente en la tabla");
  };

  const handleGenerarPDF = () => {
    if (!reporteSeleccionado) {
      alert("Por favor selecciona un reporte de la tabla");
      return;
    }
    alert(`Generando PDF del reporte: ${reporteSeleccionado.nombre}`);
  };

  const handleGenerarExcel = () => {
    if (!reporteSeleccionado) {
      alert("Por favor selecciona un reporte de la tabla");
      return;
    }
    alert(`Exportando a Excel el reporte: ${reporteSeleccionado.nombre}`);
  };

  return (
    <div className="contenedor-reporte">
      <h2>Reportes Financiero</h2>

      {/* Formulario para generar nuevo reporte */}
      <div className="form-reporte">
        <h3>Generar nuevo reporte</h3>

        <div className="campo">
          <label>Fecha inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Fecha fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Tipo de reporte:</label>
          <select
            value={tipoReporte}
            onChange={(e) => {
              setTipoReporte(e.target.value);
              setOpcionSeleccionada("");
            }}
          >
            <option value="">Seleccione</option>
            <option value="EPS">EPS</option>
            <option value="SISBEN">Sisbén</option>
          </select>
        </div>

        {tipoReporte === "EPS" && (
          <div className="campo">
            <label>EPS:</label>
            <select
              value={opcionSeleccionada}
              onChange={(e) => setOpcionSeleccionada(e.target.value)}
            >
              <option value="">Seleccione EPS</option>
              {epsOptions.map((eps, i) => (
                <option key={i} value={eps}>
                  {eps}
                </option>
              ))}
            </select>
          </div>
        )}

        {tipoReporte === "SISBEN" && (
          <div className="campo">
            <label>Categoría Sisbén:</label>
            <select
              value={opcionSeleccionada}
              onChange={(e) => setOpcionSeleccionada(e.target.value)}
            >
              <option value="">Seleccione categoría</option>
              {sisbenCategorias.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="btn-generar" onClick={handleGenerarReporte}>
          Generar
        </button>
      </div>

      {/* Tabla de reportes generados */}
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Aseguradora</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((r, i) => (
            <tr
              key={i}
              onClick={() => setReporteSeleccionado(r)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  reporteSeleccionado?.id === r.id ? "#e6f7ff" : "transparent",
              }}
            >
              <td>{r.id}</td>
              <td>{r.nombre}</td>
              <td>{r.tipo}</td>
              <td>{r.aseguradora}</td>
              <td>{r.fechaInicio}</td>
              <td>{r.fechaFin}</td>
              <td>{r.fechaCreacion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones de acciones */}
      <div className="acciones">
        <button onClick={handleGenerarPDF}>Generar PDF</button>
        <button onClick={handleGenerarExcel}>Exportar Excel</button>
      </div>

      <br />
      <button className="boton-volver" onClick={onVolver}>
        Volver
      </button>
    </div>
  );
};

export default GenerarReporte;
