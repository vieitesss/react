import { Sudoku } from "./components/Sudoku";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { NumbersBar } from "./components/NumbersBar";
import { useState } from 'react';

function App() {
    const [error, setError] = useState("");

    const handleError = err => setError(err);

    return (
        <div className="app">
            <Header error={error}/>
            <div className="sudoku-space">
                <Sudoku handleError={handleError}/>
                <SideBar />
            </div>
            <NumbersBar />
        </div>
    );
}

export default App;
