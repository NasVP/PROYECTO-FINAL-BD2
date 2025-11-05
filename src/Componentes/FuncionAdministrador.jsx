import { useState } from "react";
import "./FuncionAdministrador.css";
import administrador from "../Imagenes/administrador.jpg";

// Componentes existentes
import AgregarInsumo from "./AgregarInsumo.jsx";
import ActualizarInsumo from "./ActualizarInsumo.jsx";
import AgregarEquipoBiomedico from "./AgregarEquipo.jsx";
import ActualizarEquipoBiomedico from "./ActualizarEquipo.jsx";
import AgregarMedicamento from "./AgregarMedicamento.jsx";
import ActualizarMedicamento from "./ActualizarMedicamento.jsx";
import AgregarPersonal from "./AgregarPersonal.jsx";
import ActualizarPersonal from "./ActualizarPersonal.jsx";
import GenerarReporte from "./GenerarReporte.jsx";

// ✅ Nuevo componente para ver las evaluaciones de satisfacción
import InformeSatisfaccion from "./InformeSatisfaccion.jsx";

function FuncionAdministrador() {
  const [seccion, setSeccion] = useState(null);
  const [subSeccion, setSubSeccion] = useState(null);
  const [accion, setAccion] = useState(null);

  const [mostrarAgregarPersonal, setMostrarAgregarPersonal] = useState(false);
  const [mostrarActualizarPersonal, setMostrarActualizarPersonal] = useState(false);
  const [personalSeleccionado, setPersonalSeleccionado] = useState(null);

  // ✅ Reportes iniciales de ejemplo
  const [reportes, setReportes] = useState([
    { id: 1, nombre: "Reporte Inventario", fecha: "2025-01-01", responsable: "Administrador" }
  ]);

  // Datos ejemplo para inventario
  const productos = [
    {
      id: 1,
      nombre: "Tapabocas Quirúrgico",
      descripcion: "Triple capa",
      stock: 100,
      precio: "$2.000",
      categoria: "Insumo"
    },
  ];

  // Tabla de personal
  const [personal, setPersonal] = useState([
    { id: 1, usuario: "Juan1", nombre: "Juan", apellido: "Perez", profesion: "Enfermero", telefono: "3000000000", correo: "juan@example.com" },
  ]);

  // ✅ Render principal según sección
  const renderContenido = () => {
    if (!seccion) {
      return <h2>Seleccione una funcionalidad del panel izquierdo del módulo administrador</h2>;
    }

    if (seccion === "inventario") return renderInventario();
    if (seccion === "personal") return renderPersonal();
    if (seccion === "reportes")
      return (
        <GenerarReporte
          reportes={reportes}
          setReportes={setReportes}
          onVolver={() => setSeccion(null)}
        />
      );
    if (seccion === "informesatisfaccion")
      return <InformeSatisfaccion onVolver={() => setSeccion(null)} />; // ✅ Nuevo
  };

  // ✅ Inventario
  const renderInventario = () => {
    if (accion) {
      if (accion === "agregarinsumo") return <AgregarInsumo onVolver={() => setAccion(null)} />;
      if (accion === "modificarinsumo") return <ActualizarInsumo onVolver={() => setAccion(null)} />;

      if (accion === "agregarequipo") return <AgregarEquipoBiomedico onVolver={() => setAccion(null)} />;
      if (accion === "modificarequipo") return <ActualizarEquipoBiomedico onVolver={() => setAccion(null)} />;

      if (accion === "agregarmedicamento") return <AgregarMedicamento onVolver={() => setAccion(null)} />;
      if (accion === "modificarmedicamento") return <ActualizarMedicamento onVolver={() => setAccion(null)} />;
    }

    if (!subSeccion) {
      return (
        <div>
          <h2>Inventario - Productos</h2>

          <table className="tabla-datos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.stock}</td>
                  <td>{p.precio}</td>
                  <td>{p.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <div className="botones-categorias">
            <button onClick={() => setSubSeccion("insumo")}>Insumo</button>
            <button onClick={() => setSubSeccion("equipo")}>Equipo Biomédico</button>
            <button onClick={() => setSubSeccion("medicamento")}>Medicamento</button>
          </div>

          <div className="volver-container">
            <button className="boton-volver" onClick={() => setSeccion(null)}>Volver</button>
          </div>
        </div>
      );
    }

    // Definir columnas y filas según subSección
    let columnas = [];
    let keys = [];
    let filas = [];

    switch (subSeccion) {
      case "insumo":
        columnas = ["ID Prod", "ID Insumo", "Nombre", "Descripción", "Invima", "Lote", "Precio", "Venc", "Stock", "Categoría"];
        keys = ["idProd", "idIns", "nombre", "desc", "invima", "lote", "precio", "venc", "stock", "cat"];
        filas = [
          { idProd: 1, idIns: 1, nombre: "Guantes", desc: "Esteriles", invima: "INV123", lote: "L001", precio: "$2000", venc: "2026-10-01", stock: 50, cat: "Insumo" }
        ];
        break;

      case "equipo":
        columnas = ["Id Producto", "Serial", "Nombre", "Marca", "Descripción", "Estado", "Precio Unitario", "Stock", "Categoria"];
        keys = ["id_producto", "serial", "nombre", "marca", "descripcion", "estado", "precio_unitario", "stock", "categoria"];
        filas = [
          {
            id_producto: 4,
            serial: "EQ12345",
            nombre: "Monitor",
            marca: "Siemens",
            descripcion: "Rayos X",
            estado: "Activo",
            precio_unitario: "$200.000",
            stock: 20,
            categoria: "equipo"
          },
        ];
        break;

      case "medicamento":
        columnas = ["Id Producto", "Id Medicamento", "Nombre", "Tipo", "Lote", "Registro Invima", "Descripción", "Fecha Venc.", "Stock", "Precio Unit.", "Categoria"];
        keys = ["id_producto", "id_medicamento", "nombre", "tipo", "lote", "invima", "descripcion", "venc", "stock", "precio_unitario", "categoria"];
        filas = [
          {
            id_producto: 1,
            id_medicamento: 3,
            nombre: "Acetaminofén",
            tipo: "Analgésico",
            lote: "A21",
            invima: "MED777",
            descripcion: "500mg",
            venc: "2025-07-01",
            stock: 50,
            precio_unitario: "$5.000",
            categoria: "medicamento"
          },
        ];
        break;

      default:
        break;
    }

    return (
      <div>
        <h2>Inventario ➝ {subSeccion === "insumo" ? "Insumos" : subSeccion === "equipo" ? "Equipo Biomédico" : "Medicamentos"}</h2>

        <table className="tabla-datos">
          <thead>
            <tr>{columnas.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i}>
                {keys.map((k, j) => <td key={j}>{fila[k]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="acciones">
          <button onClick={() => setAccion("agregar" + subSeccion)}>Agregar</button>
          <button>Eliminar</button>
          <button onClick={() => setAccion("modificar" + subSeccion)}>Modificar</button>
        </div>

        <div className="volver-container">
          <button className="boton-volver" onClick={() => setSubSeccion(null)}>Volver</button>
        </div>
      </div>
    );
  };

  // ✅ Gestión de personal
  const renderPersonal = () => {
    if (mostrarAgregarPersonal) {
      return (
        <AgregarPersonal
          personal={personal}
          setPersonal={setPersonal}
          onVolver={() => setMostrarAgregarPersonal(false)}
        />
      );
    }

    if (mostrarActualizarPersonal && personalSeleccionado) {
      return (
        <ActualizarPersonal
          personalSeleccionado={personalSeleccionado}
          setPersonal={setPersonal}
          onVolver={() => {
            setMostrarActualizarPersonal(false);
            setPersonalSeleccionado(null);
          }}
        />
      );
    }

    return (
      <div>
        <h2>Gestión de Personal</h2>
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Id login</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {personal.map((p, i) => (
              <tr
                key={i}
                onClick={() => setPersonalSeleccionado(p)}
                style={{
                  cursor: "pointer",
                  backgroundColor: personalSeleccionado?.id === p.id ? "#e6f7ff" : "transparent",
                }}
              >
                <td>{p.id}</td>
                <td>{p.usuario}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.cargo}</td>
                <td>{p.telefono}</td>
                <td>{p.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="acciones">
          <button onClick={() => setMostrarAgregarPersonal(true)}>Agregar</button>
          <button>Eliminar</button>
          <button
            onClick={() => {
              if (!personalSeleccionado) {
                alert("Por favor seleccione un registro primero");
                return;
              }
              setMostrarActualizarPersonal(true);
            }}
          >
            Modificar
          </button>
        </div>

        <br />
        <button className="boton-volver" onClick={() => setSeccion(null)}>Volver</button>
      </div>
    );
  };

  // ✅ Render principal
  return (
    <div className="panel-container">
      <aside className="panel-lateral">
        <div className="imagen-administrador">
          <img src={administrador} alt="Administrador" />
        </div>

        <div className="panel-rol">
          <h3>Administrador</h3>
        </div>

        <div className="panel-botones">
          <button onClick={() => setSeccion("inventario")}>Inventario</button>
          <button onClick={() => setSeccion("personal")}>Gestión Personal</button>
          <button onClick={() => setSeccion("reportes")}>Reportes</button>
          <button onClick={() => setSeccion("informesatisfaccion")}>
            Informe Satisfacción Usuarios
          </button>
        </div>

        <button
          className="boton-volver-mini"
          onClick={() => (window.location.href = "/")}
        >
          Volver
        </button>
      </aside>

      <main className="panel-contenido">{renderContenido()}</main>
    </div>
  );
}

export default FuncionAdministrador;
