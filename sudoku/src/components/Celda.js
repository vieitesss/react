import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";

export const Celda = ({ id, borderStyle, isSelected, onSelect, currentNumber }) => {

    const [number, setNumber] = useState(currentNumber);

    useEffect(() => {
        setNumber(currentNumber)
    }, [currentNumber])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyUp);
        }
    }, [isSelected])

    const handleKeyUp = e => {
        const n = Number(e.key)

        if (!Number.isNaN(n) && isSelected) {
            setNumber(n);
        }
    }

    return (
        <div id={id}
            className={"celda" + borderStyle + (isSelected ? " selected" : "")}
            onClick={e => onSelect(e, id)}>
            {number != 0 ? number : ""}
        </div>
    )
}

Celda.propTypes = {
    id: PropTypes.string,
    borderStyle: PropTypes.string,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    initialNumber: PropTypes.number
}
