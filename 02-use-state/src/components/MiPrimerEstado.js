import { useState } from "react";

export const MiPrimerEstado = () => {

    const [nombre, setNombre] = useState("Daniel Vieites");

    const cambiarNombre = (_, newName) => {
        setNombre(() => {
            return newName;
        })
    }

    return (
        <div className="flex-item primerComponente">
            <p>{nombre}</p>
            <button onClick={e => cambiarNombre(e, "Dani")}>Cambiar a Dani</button>
            <input type="text" placeholder="Cambia el nombre" onChange={e => cambiarNombre(e, e.target.value)}/>
        </div>
    );
}
