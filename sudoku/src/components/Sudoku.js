import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react";
import { Celda } from "./Celda"

export const Sudoku = ({ handleError, togNewPuzzle, togReset, togSolution, togCheck, newNumber, isNotesActive, togNumberClicked }) => {
    const [puzzle, setPuzzle] = useState([]);
    const [currentBoard, setCurrentBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [selectedCell, setSelectedCell] = useState([-1, -1]);
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState({});
    
    const staticPuzzle = () => {
        return [
            [0,9,0,0,0,4,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,5,8,9,1,3,0,0],
            [0,0,0,0,0,0,0,0,7],
            [0,0,0,0,0,0,5,4,0],
            [0,0,0,0,7,0,0,0,0],
            [0,2,0,0,0,5,0,7,3],
            [0,0,6,3,0,0,0,9,1],
            [0,3,0,0,0,0,0,0,0],
        ]
    }

    // useEffect(() => {
    //     const newPuzzle = staticPuzzle();
    //     setPuzzle(newPuzzle.slice());
    // }, [togNewPuzzle])

    // useEffect(() => {
    //     setCurrentBoard(puzzle.slice());
    // }, [puzzle])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}", { signal })
            .then(data => data.json())
            .then(items => {
                const sudoku = items.newboard.grids[0];
                setPuzzle(sudoku.value.slice())
                setCurrentBoard(sudoku.value.slice())
                setSolution(sudoku.solution.slice())
            })
            .catch(err => handleError(err))
            .finally(() => setLoading(false))

        return () => {
            controller.abort()
        }
    }, [togNewPuzzle])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedCell])

    useEffect(() => {
        setCurrentBoard(puzzle.slice());
    }, [togReset])

    useEffect(() => {
        setCurrentBoard(solution.slice())
    }, [togSolution])

    // TODO: check flag
    useEffect(() => {}, [togCheck])

    useEffect(() => {
        if (isNotesActive) {
            updateNotes();
        } else {
            updateCurrentBoard(newNumber);
        }
        // console.log(newNumber)
    }, [newNumber, togNumberClicked])

    const updateNotes = () => {
        if (selectedCell[0] == -1 || selectedCell[1] == -1) {
            return;
        }

        const newNotes = {...notes}
        const cell = selectedCellToString()
        console.log(cell)

        if (newNotes[cell] == undefined) {
            newNotes[cell] = [newNumber]
        } else if (!newNotes[cell].includes(newNumber)) {
            newNotes[cell] = [...newNotes[cell], newNumber]
        } else {
            newNotes[cell] = newNotes[cell].filter((item) => {
                return item != newNumber;
            })
        }

        setNotes(newNotes)
    }

    const handleKeyDown = e => {
        const n = Number(e.key)
        updateCurrentBoard(n);
    }

    const updateCurrentBoard = (n) => {
        if (somethingSelected() && isNotBlocked() && !Number.isNaN(n)) {
            setCurrentBoard(prev => {
                const newBoard =  prev.map((array, row) => {
                    return array.map((value, col) => {
                        if (row == selectedCell[0] && col == selectedCell[1]) {
                            return n;
                        } 

                        return value;
                    });
                })

                return newBoard;
            })
        }
    }

    const somethingSelected = () => {
        return selectedCell[0] != -1 && selectedCell[1] != -1;
    }

    const isNotBlocked = () => {
        return puzzle[selectedCell[0]][selectedCell[1]] == 0;
    }

    const onSelect = (_, cell) => {
        setSelectedCell([cell[0], cell[1]]);
    }

    const borderStyle = (row, col) => {
        var border = "";

        if (row % 3 == 0 && row != 0) {
            border += " tborder";
        }
        if (col % 3 == 0 && col != 0) {
            border += " lborder";
        }

        return border;
    }

    const selectedCellToString = () => {
        return selectedCell[0].toString() + selectedCell[1].toString()
    }

    return (
        <div>
            {
                loading && <p>Getting puzzle...</p>
            }
            <div className="sudoku">
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(row => {
                        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => {
                            return <Celda key={`${row}${col}`}
                                id={`${row}${col}`}
                                borderStyle={borderStyle(row, col)}
                                isSelected={selectedCell[0] == row && selectedCell[1] == col}
                                onSelect={onSelect}
                                currentNumber={(currentBoard === undefined || currentBoard == 0) ? 0 : currentBoard[row][col]}
                                isBlocked={(puzzle === undefined || puzzle == 0) ? false : 
                                    (puzzle[row][col] == 0 ? false : true)}
                                cellNotes={(notes[row.toString() + col.toString()] == undefined ? [] : notes[row.toString() + col.toString()])}
                            />
                        })
                    })
                }
            </div>
        </div>
    )
}

Sudoku.propTypes = {
    handleError: PropTypes.func,
    togNewPuzzle: PropTypes.bool,
    togReset: PropTypes.bool,
    togSolution: PropTypes.bool,
    togCheck: PropTypes.bool,
    newNumber: PropTypes.number,
    isNotesActive: PropTypes.bool,
    togNumberClicked: PropTypes.bool,
}
