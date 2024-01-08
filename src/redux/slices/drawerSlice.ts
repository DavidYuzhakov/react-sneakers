import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { SneakersItem, Status } from "./sneakersSlice";

export type DrawerItem = {
  id: number,
  parentId: number,
  price: number,
  image: string,
  name: string,
}

type DrawerState = {
  open: boolean
  status: Status
  items: DrawerItem[]
  totalPrice: number,
  arrId: string[]
}

export const fetchItems = createAsyncThunk('drawer/fetchItems', async () => {
  const { data } = await axios.get<DrawerItem[]>(`https://cb846836c8be7dfd.mokky.dev/cart`)
  return data
})

export const addItem = createAsyncThunk('drawer/addItem', async (item: SneakersItem) => {
  const { data } = await axios.post<DrawerItem>(`https://cb846836c8be7dfd.mokky.dev/cart`, {...item, parentId: item.id })
  return data
})

export const removeItem = createAsyncThunk('drawer/removeItem', async (itemId: number) => {
  await axios.delete(`https://cb846836c8be7dfd.mokky.dev/cart/${itemId}`)
  return itemId
})


const initialState: DrawerState = {
  open: false,
  status: Status.LOADING,
  items: [],
  totalPrice: 0,
  arrId: ['']
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setArrId: (state) => {
      state.arrId = state.items.map(item => `#${item.id}`)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, action: PayloadAction<DrawerItem>) => {
      state.status = Status.SUCCESS;
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((total, item) => total + item.price, 0)
    });
    builder.addCase(addItem.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(addItem.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
      state.totalPrice = state.items.reduce((total, item) => total + item.price, 0)
    })
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })

    builder.addCase(removeItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.status = Status.SUCCESS
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalPrice = state.items.reduce((total, item) => total + item.price, 0)
    })
    builder.addCase(removeItem.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(removeItem.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = []
    });
  }
})

export const { setOpen, setArrId } = drawerSlice.actions
export default drawerSlice.reducer