import React from 'react';
import PropTypes from 'prop-types';

export const TercerComponente = ({nombre, apellidos}) => {
    return (
        <div>
            <h1>Comunicacion entre componentes</h1>
            <p>Nombre: {nombre}</p>
            <p>Apellidos: {apellidos}</p>
        </div>
    )
}

TercerComponente.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string,
}

TercerComponente.defaultProps = {
    nombre: "Dani",
    apellidos: "Vieites Torres"
}
