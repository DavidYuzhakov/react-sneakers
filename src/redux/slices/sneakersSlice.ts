import { Sort } from "./filterSlice";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type SneakersItem = {
  id: number
  name: string
  price: number
  image: string
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

type SneakersState = {
  items: SneakersItem[]
  status: Status
}

type SneakerUrlParams = {
  value: string,
  sort: Sort
}

export const fetchSneakers = createAsyncThunk<SneakersItem[], SneakerUrlParams>('sneakers/fetchSneakersStatus', async ({value, sort}) => {
  const { data } = await axios.get<SneakersItem[]>(`https://cb846836c8be7dfd.mokky.dev/items?sortBy=${sort.property}&name=*${value}`)
  return data
})

const initialState: SneakersState = {
  items: [],
  status: Status.LOADING
}

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: { 
    setItems: (state, action: PayloadAction<SneakersItem[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchSneakers.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchSneakers.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const { setItems } = sneakersSlice.actions
export default sneakersSlice.reducer