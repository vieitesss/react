import { useState, useEffect } from "react";
import { Celda } from "./Celda"

export const Sudoku = ({ flag }) => {
    const initialState = {
        selectedCell: "",
        puzzle: [],
        solution: [],
        difficulty: ""
    }

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const getPuzzle = async () => {
        return fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}")
            .then(data => data.json());
    }

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        getPuzzle()
            .then(items => {
                const sudoku = items.newboard.grids[0];
                console.log(sudoku)
                setState(prevState => {
                    return {
                        ...prevState,
                        puzzle: sudoku.value,
                        solution: sudoku.solution,
                        difficulty: sudoku.difficulty
                    }
                })
            })
            .catch()
            .finally(() => setLoading(false))

        return () => {
            controller.abort()
        }
    }, [flag])

    const onSelect = (_, cell) => {
        setState(prevState => {
            return {
                ...prevState,
                selectedCell: cell,
            }
        })
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
            <p>
                {
                    loading && "Getting puzzle..."
                }
            </p>
            <div className="sudoku">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, irow) => {
                        return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((col, icol) => {
                            return <Celda key={`${row}${col}`}
                                id={`${row}${col}`}
                                borderStyle={borderStyle(irow, icol)}
                                isSelected={`${row}${col}` === state.selectedCell}
                                onSelect={onSelect}
                                currentNumber={(state.puzzle === undefined || state.puzzle == 0) ? 0 : state.puzzle[irow][icol]}
                            />
                        })
                    })
                }
            </div>
        </>
    )
}
