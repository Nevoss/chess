import { configureStore, combineReducers } from "@reduxjs/toolkit";
import * as gameService from "./services/game";
import * as playerService from "./services/player";
import {
  useSelector as useBaseSelector,
  useDispatch as useBaseDispatch,
  TypedUseSelectorHook,
} from "react-redux";

const reducer = combineReducers({
  game: gameService.reducer,
  player: playerService.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...Object.values(playerService.middlewares),
    ...Object.values(gameService.middlewares),
  ],
});

export type RootState = ReturnType<typeof reducer>;
export type Dispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
export const useDispatch: () => Dispatch = useBaseDispatch;

export default store;
