import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum Turn {
    PlayerOne = "Player One",
    PlayerTwo = "Player Two"
}

export enum BoardState {
    X,
    O,
    Empty
}

export interface GameStateSliceType {
    turn: Turn
    winner: Turn | null | "Tied"
    completed: boolean
    board: BoardState[]
}

export const initialState: GameStateSliceType = {
    turn: Turn.PlayerOne,
    winner: null,
    completed: false,
    board: [
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Empty
    ]
}

const hasWon = (board: BoardState[]): boolean => {
    // check for three in a row horizontally
    if (board[0] !== BoardState.Empty && board[0] === board[1] && board[0] === board[2]) {
        // first row win
        return true
    }
    if (board[3] !== BoardState.Empty && board[3] === board[4] && board[3] === board[5]) {
        // second row win
        return true
    }
    if (board[6] !== BoardState.Empty && board[6] === board[7] && board[6] === board[8]) {
        // third row win
        return true
    }

    // check for three in a row vertically
    if (board[0] !== BoardState.Empty && board[0] === board[3] && board[0] === board[6]) {
        // first column win
        return true
    }
    if (board[1] !== BoardState.Empty && board[1] === board[4] && board[1] === board[7]) {
        // second column win
        return true
    }
    if (board[2] !== BoardState.Empty && board[2] === board[5] && board[2] === board[8]) {
        // third column win
        return true
    }

    // top left to bottom right
    if (board[0] !== BoardState.Empty && board[0] === board[4] && board[0] === board[8]) {
        // diagonal win
        return true
    }

    // top right to bottom left
    if (board[2] !== BoardState.Empty && board[2] === board[4] && board[2] === board[6]) {
        // diagonal win
        return true
    }

    return false
}

const hasTied = (board: BoardState[]): boolean => {
    if (!hasWon(board) && !board.some((cell) => cell === BoardState.Empty)) {
        return true
    }

    return false
}

export const gameStateSlice = createSlice({
    name: "gameState",
    initialState,
    reducers: {
        playSquare: (state, action: PayloadAction<number>) => {
            if (state.board[action.payload] !== BoardState.Empty) {
                return
            }
            if (state.turn === Turn.PlayerOne) {
                state.board[action.payload] = BoardState.X
                if (hasWon(state.board)) {
                    state.winner = Turn.PlayerOne
                    state.completed = true
                }
                if (hasTied(state.board)) {
                    state.winner = "Tied"
                    state.completed = true
                }
                state.turn = Turn.PlayerTwo
            } else {
                state.board[action.payload] = BoardState.O
                if (hasWon(state.board)) {
                    state.winner = Turn.PlayerTwo
                    state.completed = true
                }
                if (hasTied(state.board)) {
                    state.winner = "Tied"
                    state.completed = true
                }
                state.turn = Turn.PlayerOne
            }
        },
        setTurn: (state, action: PayloadAction<Turn>) => {
            state.turn = action.payload
        },
        reset: (state) => {
            state.turn = Turn.PlayerOne
            state.board = [
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty,
                BoardState.Empty
            ]
            state.winner = null
            state.completed = false
        }
    }
})

// Action creators are generated for each case reducer function
export const { setTurn, playSquare, reset } = gameStateSlice.actions
