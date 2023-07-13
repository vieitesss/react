import { PropTypes } from 'prop-types';

export const Header = ({ error }) => {
    return (
        <div className="header">
            <h2>Mi sudoku</h2>
            {
                error && <p className="error">{error}</p>
            }
        </div>
    );
}

Header.propTypes = {
    handleUpdate: PropTypes.func,
    error: PropTypes.string,
}
