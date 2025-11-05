import "./AgregarInsumo.css";

function ActualizarInsumo({ onVolver }) {
    return (
        <div className="form-container">
            <h2 className="titulo-form">Actualizar Insumo</h2>

            <form className="formulario">
                <label>Id Insumo:</label>
                <input type="text" placeholder="Ej: 001" disabled />

                <label>Nombre:</label>
                <input type="text" placeholder="Nombre insumo" />

                <label>Descripción:</label>
                <textarea placeholder="Descripción del insumo"></textarea>

                <label>Registro Invima:</label>
                <input type="text" placeholder="Registro Invima" />

                <label>Lote:</label>
                <input type="text" placeholder="Lote" />

                <label>Precio Unitario:</label>
                <input type="number" placeholder="$" />

                <label>Fecha vencimiento:</label>
                <input type="date" />

                <label>Stock:</label>
                <input type="number" placeholder="Cantidad disponible" />

                <label>Categoria:</label>
                <select name="categoria" required>
                    <option value="">Seleccione la categoria</option>
                    <option value="medicamento">medicamento</option>
                    <option value="equipo biomedico">equipo biomedico</option>
                    <option value="insumo">insumo</option>
                </select>


                <div className="botones-form">
                    <button type="submit" className="btn-agregar">Guardar Cambios</button>
                    <button type="button" className="btn-volver" onClick={onVolver}>
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActualizarInsumo;
