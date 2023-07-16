import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NumbersBar = ({ handleNumber, toggleNotesActive, notesActive }) => {
    return (
        <div className="numbersbar">
            <button className='notes' onClick={toggleNotesActive}
            style={notesActive ? { background: "#4D556A" } : {}}>
                <FontAwesomeIcon className='icon' icon="fa-solid fa-pencil"
                    
                />
            </button>
            {
                [1,2,3,4,5,6,7,8,9].map(value => {
                    return <button key={value} className="number" onClick={e => handleNumber(e, value)}>{value}</button>
                })
            }
        </div>
    );
}

NumbersBar.propTypes = {
    handleNumber: PropTypes.func,
    toggleNotesActive: PropTypes.func,
    notesActive: PropTypes.bool,
}
