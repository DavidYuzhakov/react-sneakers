import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { SneakersItem, Status } from "./sneakersSlice";
import { DrawerItem } from "./drawerSlice";

type FavoritesState = {
  status: Status
  favItems: DrawerItem[]
}

const initialState: FavoritesState = {
  status: Status.LOADING,
  favItems: []
}

export const fetchFavItems = createAsyncThunk('favorites/fetchItems', async () => {
  const { data } = await axios.get<DrawerItem[]>('https://cb846836c8be7dfd.mokky.dev/favorites')
  return data
})

export const removeFavItem = createAsyncThunk('favorites/removeItem', async (favId: number) => {
  await axios.delete(`https://cb846836c8be7dfd.mokky.dev/favorites/${favId}`)
  return favId
})

export const addFavItem = createAsyncThunk('favorites/addItem', async (item: SneakersItem) => {
  const { data } = await axios.post<DrawerItem>('https://cb846836c8be7dfd.mokky.dev/favorites/', {...item, parentId: item.id})
  return data
})

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addFavItem.fulfilled, (state, action: PayloadAction<DrawerItem>) => {
      state.status = Status.SUCCESS
      state.favItems.push(action.payload)
    })
    builder.addCase(addFavItem.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(addFavItem.rejected, (state) => {
      state.status = Status.ERROR
      state.favItems = []
    })
    builder.addCase(fetchFavItems.fulfilled, (state, action: PayloadAction<DrawerItem[]>) => {
      state.status = Status.SUCCESS
      state.favItems = action.payload
    })
    builder.addCase(fetchFavItems.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchFavItems.rejected, (state) => {
      state.status = Status.ERROR
      state.favItems = []
    })
    builder.addCase(removeFavItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.status = Status.SUCCESS
      state.favItems = state.favItems.filter(item => item.id !== action.payload)
    })
    builder.addCase(removeFavItem.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(removeFavItem.rejected, (state) => {
      state.status = Status.ERROR
      state.favItems = []
    })
  },
})

export default favoriteSlice.reducer