import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Product = [{
  id: String,
  title: String,
  quantity: Number,
  currency_id: String,
  unit_price: Number
  img: String
}]

type Products = Product[]

const initialState: Products = []

export const chartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addCarrinho: (state, action) => {
      state.push(action.payload)
    },
    removeCarrinho: (state, action)=>{
      state.splice(action.payload, 1)
    }
  },
})


export const { addCarrinho, removeCarrinho } = chartSlice.actions

export default chartSlice.reducer