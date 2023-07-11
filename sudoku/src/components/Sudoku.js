import { PropTypes } from 'prop-types';
import { useState, useEffect } from "react";
import { Celda } from "./Celda"

export const Sudoku = ({ flag, handleError }) => {
    const [puzzle, setPuzzle] = useState([]);
    const [currentBoard, setCurrentBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [selectedCell, setSelectedCell] = useState([-1, -1]);
    const [loading, setLoading] = useState(false);
    
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

    useEffect(() => {
        console.log("reset puzzle");
        const newPuzzle = staticPuzzle();
        setPuzzle(newPuzzle.slice());
        setCurrentBoard(newPuzzle.slice());
    }, [flag])

    useEffect(() => {
        console.log(puzzle === currentBoard)
    }, [puzzle])

    // const getPuzzle = async () => {
    //     return fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}")
    //         .then(data => data.json());
    // }

    // useEffect(() => {
    //     const controller = new AbortController()
    //     setLoading(true)
    //     getPuzzle()
    //         .then(items => {
    //             const sudoku = items.newboard.grids[0];
    //             setPuzzle(sudoku.value)
    //         })
    //         .catch(err => handleError(err))
    //         .finally(() => setLoading(false))

    //     return () => {
    //         controller.abort()
    //     }
    // }, [flag])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedCell])

    const handleKeyDown = e => {
        const n = Number(e.key)

        if (!Number.isNaN(n) && isNotBlocked()) {
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

    return (
        <>
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
                            />
                        })
                    })
                }
            </div>
        </>
    )
}

Sudoku.propTypes = {
    flag: PropTypes.number,
    handleError: PropTypes.func,
}
