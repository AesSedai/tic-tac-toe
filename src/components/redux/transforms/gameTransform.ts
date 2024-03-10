import { createTransform } from "redux-persist"
import { initialState, gameStateSlice, GameStateSliceType } from "../slices/gameState"

export const gameTransform = createTransform<GameStateSliceType, GameStateSliceType>(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        return inboundState
    },
    // transform state being rehydrated
    (outboundState, key) => {
        return Object.assign({}, initialState, outboundState)
    },
    // define which reducers this transform gets called for.
    { whitelist: [gameStateSlice.name] }
)
