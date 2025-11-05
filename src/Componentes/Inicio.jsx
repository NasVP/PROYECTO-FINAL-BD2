import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./Inicio.css";
import QuienesSomos from "./QuienesSomos";
import Evaluacion from "./Evaluacion";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      contrasena: "",
      mostrarQuienesSomos: false,
      mostrarEvaluacion: false,
      redireccion: null, // ✅ Nuevo estado para redirigir
    };
  }

  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ingresar = async () => {
    const { usuario, contrasena } = this.state;

    if (!usuario || !contrasena) {
      alert("Por favor ingrese usuario y contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (response.status === 401) {
        alert("Usuario o contraseña incorrectos");
        return;
      }

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      const data = await response.json();
      const rol = data.rol;

      if (rol === "admin") {
        this.setState({ redireccion: "/bienvenido-administrador" });
      } else if (rol === "medico") {
        this.setState({ redireccion: "/bienvenido-medico" });
      } else if (rol === "enfermero") {
        this.setState({ redireccion: "/bienvenido-enfermero" });
      } else {
        alert("Rol desconocido: " + rol);
      }

      localStorage.setItem("usuario", JSON.stringify({ usuario, rol }));

    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    if (this.state.redireccion) {
      return <Navigate to={this.state.redireccion} />;
    }

    if (this.state.mostrarQuienesSomos) {
      return <QuienesSomos />;
    }

    if (this.state.mostrarEvaluacion) {
      return <Evaluacion />;
    }

    return (
      <div className="inicio-container">
        <header className="inicio-header">
          <h1>Orcas IPS</h1>
        </header>

        <div className="botones-inferiores">
          <button
            className="inicio-boton-quienes-somos"
            onClick={() => this.setState({ mostrarQuienesSomos: true })}
          >
            Quiénes Somos
          </button>

          <button
            className="inicio-boton-evaluanos"
            onClick={() => this.setState({ mostrarEvaluacion: true })}
          >
            Evalúanos
          </button>
        </div>

        <div className="inicio-card">
          <h1 className="inicio-titulo">Bienvenido</h1>

          <input
            type="text"
            name="usuario"
            placeholder="Ingrese su usuario"
            value={this.state.usuario}
            onChange={this.manejarCambio}
            className="inicio-input"
          />

          <input
            type="password"
            name="contrasena"
            placeholder="Ingrese su contraseña"
            value={this.state.contrasena}
            onChange={this.manejarCambio}
            className="inicio-input"
          />

          <button onClick={this.ingresar} className="inicio-boton">
            Ingresar
          </button>
        </div>
      </div>
    );
  }
}

export default Inicio;