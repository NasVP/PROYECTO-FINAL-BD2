import { useState } from "react";
import "./AgregarInsumo.css";

function AgregarInsumo({ onVolver }) {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        invima: "",
        lote: "",
        fecha_venc: "",
        precio_unitario: "",
        stock: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Insumo agregado correctamente");
        onVolver();
    };

    return (
        <div className="form-container">
            <h2 className="titulo-form">Agregar Insumo</h2>

            <form className="formulario" onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="nombre" onChange={handleChange} placeholder="Escribe el nombre del inumo" required />

                <label>Descripción:</label>
                <textarea name="descripcion" onChange={handleChange} placeholder="Escriba la descripcion del innsumo" required />

                <label>Registro Invima:</label>
                <input type="text" name="invima" onChange={handleChange} placeholder="Escriba el registro invima del insumo"required />

                <label>Lote:</label>
                <input type="text" name="lote" onChange={handleChange} placeholder="Escriba el lote del insumo" required />

                <label>Fecha Vencimiento:</label>
                <input type="date" name="fecha_venc" onChange={handleChange} placeholder="Seleccione la fecha de vencimiento del insumo"required />

                <label>Precio Unitario:</label>
                <input type="number" name="precio_unitario" onChange={handleChange} placeholder="Ingrese el valor unitario del insumo"required />

                <label>Stock:</label>
                <input type="number" name="stock" onChange={handleChange}placeholder="Ingrese la cantidad de insumos a agregar"required />

             <label>Categoria:</label>
                <select name="categoria" onChange={handleChange} required>
                    <option value="">Seleccione la categoria</option>
                    <option value="medicamento">medicamento</option>
                    <option value="equipo biomedico">equipo biomedico</option>
                    <option value="insumo">insumo</option>
                </select>

                <div className="botones-form">
                    <button type="submit" className="btn-agregar">Agregar</button>
                    <button type="button" className="btn-volver" onClick={onVolver}>
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AgregarInsumo;
