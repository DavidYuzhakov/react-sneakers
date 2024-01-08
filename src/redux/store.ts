import { configureStore } from "@reduxjs/toolkit";
import sneakers from "./slices/sneakersSlice";
import filter from './slices/filterSlice'
import drawer from './slices/drawerSlice'
import orders from './slices/ordersSlice'
import favorites from './slices/favoritesSlice'

const store = configureStore({
  reducer: {
    sneakers,
    filter,
    drawer,
    orders,
    favorites
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch