import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzaItems = createAsyncThunk(
    'pizza/fetchPizzaItems',
    async (params) => {
        const {currentPage, categoryId, sortId, searchValue, sortValues} = params;
        // console.log(currentPage);
        const res = await axios.get(`https://62fb8191e4bcaf53518672e4.mockapi.io/api/items?page=${currentPage}&limit=8&sortBy=${sortValues[sortId]}&order=${sortId==0?'desc':'asc'}${categoryId!==undefined ? `&category=${categoryId}`:''}${searchValue? `&name=${searchValue}`:''}`);        
        return res.data;         
    }
  )


const initialState = {
    items: [],
    status: 'loading', //error, loading, success
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action)=>{
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzaItems.pending]:(state)=>{
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzaItems.fulfilled]:(state, action)=>{
            console.log(action.payload)
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzaItems.rejected]:(state, action)=>{
            state.status = 'error';
            state.items = [];
        },
    }
      
  })


  export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer