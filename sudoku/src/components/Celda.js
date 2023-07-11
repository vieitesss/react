import { PropTypes } from 'prop-types';

export const Celda = ({ id, borderStyle, isSelected, onSelect, currentNumber, isBlocked }) => {
    return (
        <div id={id}
            className={"celda"
                + borderStyle
                + (isSelected ? " selected" : "")
                + (isBlocked ? " blocked" : "")}
            onClick={e => onSelect(e, id)}>
            {currentNumber != 0 ? currentNumber : ""}
        </div>
    )
}

Celda.propTypes = {
    id: PropTypes.string,
    borderStyle: PropTypes.string,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    currentNumber: PropTypes.number,
    isBlocked: PropTypes.bool,
}
