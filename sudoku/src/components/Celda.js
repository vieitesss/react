import { memo } from 'react';
import { PropTypes } from 'prop-types';

export const Celda = memo(({ id, borderStyle, isSelected, onSelect, currentNumber, isBlocked, cellNotes }) => {
    console.log({ id, cellNotes })
    return (
        <div id={id}
            className={
                "cell "
                + (currentNumber == 0 ? "emptyCell " : "notEmptyCell ")
                + borderStyle
                + (isSelected ? " selected" : "")
                + (isBlocked ? " blocked" : " guess")}
            onClick={e => onSelect(e, id)}>
            {
                currentNumber == 0 && (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => {
                        return (
                            <div key={value} className='numberNote'>
                                {cellNotes.includes(value) ? value : " "}
                            </div>
                        )
                    })
                )
            }
            {currentNumber != 0 ? currentNumber : ""}
        </div>
    )
})

Celda.propTypes = {
    id: PropTypes.string,
    borderStyle: PropTypes.string,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    currentNumber: PropTypes.number,
    isBlocked: PropTypes.bool,
    cellNotes: PropTypes.arrayOf(PropTypes.number),
}
