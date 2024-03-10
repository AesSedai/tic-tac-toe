import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import { BoardState } from "../redux/slices/gameState"
import CloseIcon from "@mui/icons-material/Close"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { Box } from "@mui/material"
import { CellHeight, CellWidth } from "../../utils/constants"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    "& > svg": {
        width: "100%",
        height: "100%"
    }
}))

interface SquareProps {
    state: BoardState
    click?: () => void
}

const mapping: { [k in BoardState]: JSX.Element } = {
    [BoardState.X]: <CloseIcon />,
    [BoardState.O]: <RadioButtonUncheckedIcon />,
    [BoardState.Empty]: <div />
}

export const Square = (props: SquareProps): JSX.Element => {
    const { state, click, ...other } = props

    return (
        <Box
            onClick={() => (click == undefined ? null : click())}
            sx={{
                width: CellWidth,
                height: CellHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <Box sx={{ width: CellWidth * 0.9, height: CellHeight * 0.9 }}>
                <Item>{mapping[state]}</Item>
            </Box>
        </Box>
    )
}
