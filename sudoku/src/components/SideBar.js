import { PropTypes } from 'prop-types';

export const SideBar = ({ toggleNew, toggleReset, toggleSolution, toggleCheck }) => {
    return (
        <div className="sidebar">
            <button onClick={toggleReset}>Reset</button>
            <button onClick={toggleCheck}>Check</button>
            <button onClick={toggleSolution}>Solution</button>
            <button className="new" onClick={toggleNew}>New</button>
        </div>
    );
}

SideBar.propTypes = {
    toggleNew: PropTypes.func,
    toggleReset: PropTypes.func,
    toggleSolution: PropTypes.func,
    toggleCheck: PropTypes.func,
}
