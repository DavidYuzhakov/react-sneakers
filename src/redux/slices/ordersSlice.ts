import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "./sneakersSlice";
import { DrawerItem } from "./drawerSlice";
import axios from "axios";

type OrderState = {
  orderStatus: Status,
  ordersItems: DrawerItem[],
}

type OrdersList = {
  id: number
  items: DrawerItem[]
}

const initialState: OrderState = {
  orderStatus: Status.LOADING,
  ordersItems: [],
}

export const addOrderItems = createAsyncThunk('orders/addOrderItems', async (items: DrawerItem[]) => {
  const { data } = await axios.post<OrdersList>('https://cb846836c8be7dfd.mokky.dev/orders', { items })
  return data.items
})

export const fetchOrderItems = createAsyncThunk('orders/fetchOrderItems', async () => {
  const { data } = await axios.get<OrdersList[]>('https://cb846836c8be7dfd.mokky.dev/orders')
  return data.flatMap(order => order.items)
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrderItems.fulfilled, (state, action: PayloadAction<DrawerItem[]>) => {
      state.orderStatus = Status.SUCCESS
      state.ordersItems.push(...action.payload)
    })
    builder.addCase(addOrderItems.pending, (state) => {
      state.orderStatus = Status.LOADING
    })
    builder.addCase(addOrderItems.rejected, (state) => {
      state.orderStatus = Status.ERROR
      state.ordersItems = []
    })

    builder.addCase(fetchOrderItems.fulfilled, (state, action: PayloadAction<DrawerItem[]>) => {
      state.orderStatus = Status.SUCCESS
      state.ordersItems = action.payload
    })
    builder.addCase(fetchOrderItems.pending, (state) => {
      state.orderStatus = Status.LOADING
    })
    builder.addCase(fetchOrderItems.rejected, state => {
      state.orderStatus = Status.ERROR
      state.ordersItems = []
    })
  }
})

export default ordersSlice.reducer