import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { wikipediaApi } from "services/api/wikipediaApi";
import { ibgeApi } from "../services/api/ibgeApi";

export const store = configureStore({
  reducer: {
    [ibgeApi.reducerPath]: ibgeApi.reducer,
    [wikipediaApi.reducerPath]: wikipediaApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ibgeApi.middleware,
      wikipediaApi.middleware
    )
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const dispatch: AppDispatch = store.dispatch
export const getState = store.getState

setupListeners(dispatch)