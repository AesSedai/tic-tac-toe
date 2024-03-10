import Grid from "@mui/material/Unstable_Grid2"
import { useAppDispatch, useAppSelector } from "../redux/store/hooks"
import { Square } from "./square"
import { CellHeight, CellWidth } from "../../utils/constants"
import { Box } from "@mui/material"
import { playSquare } from "../redux/slices/gameState"

export const Board = (): JSX.Element => {
    const boardState = useAppSelector((state) => state.gameState.board)
    const winner = useAppSelector((state) => state.gameState.winner)
    const dispatch = useAppDispatch()

    const clickSquare = (idx: number) => {
        dispatch(playSquare(idx))
    }

    return (
        <Box>
            <Grid container spacing={0} columns={3} sx={{ width: CellWidth * 3, height: CellHeight * 3 }}>
                {boardState.map((square, idx) => (
                    <Grid key={idx}>
                        {winner == null ? (
                            <Square click={() => clickSquare(idx)} state={square} />
                        ) : (
                            <Square state={square} />
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
