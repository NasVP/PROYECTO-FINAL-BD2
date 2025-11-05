import { useState } from "react";
import "./AgregarEquipo.css";

function AgregarEquipo({ onVolver }) {

    const [form, setForm] = useState({
        nombre: "",
        marca: "",
        serial: "",
        descripcion: "",
        estado: "",
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
        alert("✅ Equipo Biomédico agregado correctamente");
        onVolver();
    };

    return (
        <div className="form-container">
            <h2 className="titulo-form">Agregar Equipo Biomédico</h2>

            <form className="formulario" onSubmit={handleSubmit}>

                <label>Serial:</label>
                <input
                    type="text"
                    name="serial"
                    onChange={handleChange}
                    placeholder="Ingrese el serial del equipo"
                    required
                />


                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    placeholder="Ingrese el nombre del equipo"
                    required
                />

                <label>Marca:</label>
                <input
                    type="text"
                    name="marca"
                    onChange={handleChange}
                    placeholder="Ingrese la marca del equipo"
                    required
                />

                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    onChange={handleChange}
                    placeholder="Describa el equipo"
                    required
                />

                <label>Estado:</label>
                <select name="estado" onChange={handleChange} required>
                    <option value="">Seleccione el estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="mantenimiento">En Mantenimiento</option>
                </select>


                <label>Precio Unitario:</label>
                <input
                    type="number"
                    name="precio_unitario"
                    onChange={handleChange}
                    placeholder="Ingrese el precio del equipo"
                    required
                />

                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    placeholder="Cantidad disponible"
                    required
                />

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

export default AgregarEquipo;
