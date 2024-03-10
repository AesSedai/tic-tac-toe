import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { gameStateSlice } from "../slices/gameState"
import { gameTransform } from "../transforms/gameTransform"

// only persist the items in the gameStateSlice
const persistConfig = {
    key: "root",
    storage,
    whitelist: [gameStateSlice.name],
    transforms: [gameTransform]
}

const reducers = combineReducers({
    [gameStateSlice.name]: gameStateSlice.reducer
})

export type RootReducer = ReturnType<typeof reducers>

const persistedReducer = persistReducer<RootReducer>(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
    devTools: import.meta.env.DEV
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
