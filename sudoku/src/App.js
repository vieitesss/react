import { Sudoku } from "./components/Sudoku";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { NumbersBar } from "./components/NumbersBar";
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import useToggle from "./hooks/useToggle";

library.add(fas)

function App() {
    const [error, setError] = useState("");
    const [togNewPuzzle, toggleNewPuzzle] = useToggle(false);
    const [togReset, toggleReset] = useToggle(false);
    const [togSolution, toggleSolution] = useToggle(false);
    const [togCheck, toggleCheck] = useToggle(false);
    const [newNumber, setNewNumber] = useState(0);
    const [isNotesActive, toggleNotesActive] = useToggle(false);
    const [togNumberClicked, toggleNumberClicked] = useToggle(false);

    const handleError = err => setError(err);

    const handleNumber = (_, n) => {
        const nn = n
        toggleNumberClicked()
        setNewNumber(nn);
    }

    return (
        <div className="app">
            <Header error={error}/>
            <div className="sudoku-space">
                <Sudoku handleError={handleError}
                    togNewPuzzle={togNewPuzzle}
                    togReset={togReset}
                    togSolution={togSolution}
                    togCheck={togCheck}
                    newNumber={newNumber}
                    isNotesActive={isNotesActive}
                    togNumberClicked={togNumberClicked}
                />
                <SideBar toggleNew={toggleNewPuzzle}
                    toggleReset={toggleReset}
                    toggleSolution={toggleSolution}
                    toggleCheck={toggleCheck}
                />
            </div>
            <NumbersBar handleNumber={handleNumber}
                toggleNotesActive={toggleNotesActive}
                notesActive={isNotesActive} 
            />
        </div>
    );
}

export default App;
