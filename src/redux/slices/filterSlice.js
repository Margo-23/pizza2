import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: undefined,
    currentPage: 1,
    sortId: 0,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  //actions - называется в объекте filterSlice
  reducers: {
    changeCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSortId: (state, action)=>{
      state.sortId = action.payload;
    },
    changeCurrentPage: (state, action)=>{
      state.currentPage = action.payload;
    },
    setFilters:(state, action)=>{
      state.sortId= action.payload.sortId;
      state.currentPage= action.payload.currentPage;
      state.categoryId= action.payload.categoryId;
    }
  },
})


export const { changeCategoryId, changeSortId, changeCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer