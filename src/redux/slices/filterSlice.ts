import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export type Sort = {
  name: string
  property: 'name' | '-price' | 'price'
}

type FilterState = {
  value: string,
  sort: Sort
}

const initialState: FilterState = {
  value: '',
  sort: {
    name: 'По названию',
    property: 'name'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    }
  }
})

export const { setValue, setSort } = filterSlice.actions
export default filterSlice.reducer