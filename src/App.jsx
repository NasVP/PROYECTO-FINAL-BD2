import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BienvenidoAdministrador from "./Componentes/BienvenidoAdministrador";
import BienvenidoMedico from "./Componentes/BievenidoMedico";
import BienvenidoEnfermero from "./Componentes/BienvenidoEnfermero";
import QuienesSomos from "./Componentes/QuienesSomos";
import Evaluacion from "./Componentes/Evaluacion";
import Inicio from "./Componentes/Inicio";
import FuncionAdministrador from "./Componentes/FuncionAdministrador"
import FuncionMedico from "./Componentes/FuncionMedico"
import FuncionEnfermero from "./Componentes/FuncionEnfermero"
import ProtectedRoute from "./Componentes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/evaluacion" element={<Evaluacion />} />

        {/* === RUTAS PROTEGIDAS === */}
        <Route
          path="/bienvenido-administrador"
          element={
            <ProtectedRoute rolPermitido="admin">
              <BienvenidoAdministrador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bienvenido-medico"
          element={
            <ProtectedRoute rolPermitido="medico">
              <BienvenidoMedico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bienvenido-enfermero"
          element={
            <ProtectedRoute rolPermitido="enfermero">
              <BienvenidoEnfermero />
            </ProtectedRoute>
          }
        />

        <Route
          path="/funcion-administrador"
          element={
            <ProtectedRoute rolPermitido="admin">
              <FuncionAdministrador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcion-medico"
          element={
            <ProtectedRoute rolPermitido="medico">
              <FuncionMedico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcion-enfermero"
          element={
            <ProtectedRoute rolPermitido="enfermero">
              <FuncionEnfermero />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

