import { Box, Button, Typography } from "@mui/material"
import { Board } from "./components/board/board"
import { useAppDispatch, useAppSelector } from "./components/redux/store/hooks"
import { reset } from "./components/redux/slices/gameState"

export const App = (): JSX.Element => {
    const turn = useAppSelector((state) => state.gameState.turn)
    const winner = useAppSelector((state) => state.gameState.winner)
    const dispatch = useAppDispatch()

    const clickReset = () => {
        dispatch(reset())
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            }}>
            {winner == null ? (
                <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
                    Turn: {turn}
                </Typography>
            ) : (
                <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
                    Winner: {winner}
                </Typography>
            )}
            <Board></Board>
            <Button sx={{ mt: 3 }} onClick={clickReset}>
                Reset
            </Button>
        </Box>
    )
}
