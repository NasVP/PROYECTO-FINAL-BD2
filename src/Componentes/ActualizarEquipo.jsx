import "./AgregarInsumo.css";

function ActualizarEquipo({ onVolver }) {
    return (
        <div className="form-container">
            <h2 className="titulo-form">Actualizar Equipo Biomédico</h2>

            <form className="formulario">
                <label>Serial:</label>
                <input type="text" placeholder="Serial del equipo" />

                <label>Nombre:</label>
                <input type="text" placeholder="Nombre del equipo" />

                <label>Marca:</label>
                <input type="text" placeholder="Marca del equipo" />

                <label>Descripción:</label>
                <textarea placeholder="Descripción del equipo"></textarea>

                <label>Estado:</label>
                <input type="text" placeholder="Estado del equipo" />

                <label>Precio Unitario:</label>
                <input type="number" placeholder="$" />

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

export default ActualizarEquipo;
