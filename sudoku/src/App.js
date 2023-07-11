import { Sudoku } from "./components/Sudoku";
import { useState } from 'react';

function App() {
    const [flag, setFlag] = useState(0);
    const [error, setError] = useState("");

    const handleError = err => setError(err);

    const handleUpdate = () => {
        setFlag(prev => {
            return prev == 0 ? 1 : 0;
        })
    }

    return (
        <div className="app">
            <h2>Mi sudoku</h2>
            {
                error && <p className="error">{error}</p>
            }
            <button onClick={handleUpdate}>Update</button>
            <Sudoku flag={flag} handleError={handleError}/>
        </div>
    );
}

export default App;
