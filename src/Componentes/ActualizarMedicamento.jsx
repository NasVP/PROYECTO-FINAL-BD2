import "./AgregarInsumo.css";

function ActualizarMedicamento({ onVolver }) {
    return (
        <div className="form-container">
            <h2 className="titulo-form">Actualizar Medicamento</h2>

            <form className="formulario">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre del medicamento" />

                <label>Tipo:</label>
                <input type="text" placeholder="Tipo de medicamento" />

                <label>Lote:</label>
                <input type="text" placeholder="Lote del medicamento" />

                <label>Registro Invima:</label>
                <input type="text" placeholder="Registro Invima" />

                <label>Descripción:</label>
                <textarea placeholder="Descripción del medicamento"></textarea>

                <label>Fecha Vencimiento:</label>
                <input type="date" />

                <label>Stock:</label>
                <input type="number" placeholder="Cantidad disponible" />

                <label>Precio Unitario:</label>
                <input type="number" placeholder="$" />

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

export default ActualizarMedicamento;
