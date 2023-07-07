import React from 'react';

export const Eventos = () => {

    function handleClick(e, saludo) {
        console.log(saludo);
    };

    return (
        <div>
            <h1>Eventos</h1>
            { /* La llamada a la funcion del evento se pone de esta manera para
            que la funcion no se ejecute en cuanto se cargue la pagina y lo haga
            solo cuando ocurre el evento */ }
            <button onClick={e => handleClick(e, "Hola, soy un parametro")}>
                Pulsa</button>
        </div>
    )
}
