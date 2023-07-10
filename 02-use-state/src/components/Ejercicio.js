import PropTypes from 'prop-types';
import { useState } from 'react';

export const Ejercicio = ({year}) => {
    const [currentYear, setYear] = useState(year);

    const changeYear = (_, amount) => {
        setYear(prev => {
            return prev + amount;
        });
    }

    const updateYear = e => {
        setYear(() => {
            return Number(e.target.value);
        });
    }

    return (
        <div className="flex-item ejercicio">
            <h2>Aqui comienza el ejercicio</h2>
            <p>El año actual es: {currentYear}</p>
            <button onClick={e => changeYear(e, -1)}>Prev year</button>
            <button onClick={e => changeYear(e, 1)}>Next year</button>
            <input type="text" placeholder='Change the year' onChange={e => updateYear(e)}/>
        </div>
    )
}

Ejercicio.propTypes = {
    year: PropTypes.number.isRequired
}
