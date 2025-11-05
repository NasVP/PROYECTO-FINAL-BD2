import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, rolPermitido }) {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioGuardado) {
    alert("Debe iniciar sesión primero");
    return <Navigate to="/" />;
  }

  if (usuarioGuardado.rol !== rolPermitido) {
    alert("No tiene permisos para acceder a esta sección");
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
