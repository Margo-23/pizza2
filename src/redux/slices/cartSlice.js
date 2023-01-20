import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
    
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    //actions - называется в объекте filterSlice
    reducers: {
          addItem: (state, action) => {
            const findItem = state.items.find((obj)=>action.payload.id == obj.id);
            if(findItem){
                findItem.count++;
            }else{
                state.items.push({...action.payload, count: 1});
            }
        state.totalPrice = state.items.reduce((sum,obj)=>{           
                return sum + obj.price*obj.count;
        }, 0)
        state.totalItems = state.items.reduce((sum, obj)=>{
            return sum + obj.count
        }, 0)
      },
      removeItem:(state, action)=>{
        state.items = state.items.filter(obj=>obj.id != action.payload)
        state.totalPrice = state.items.reduce((sum,obj)=>{           
            return sum + obj.price*obj.count;
    }, 0)
    state.totalItems = state.items.reduce((sum, obj)=>{
        return sum + obj.count
    }, 0)
      },
      clearItems: (state)=>{
        state.items = [];
        state.totalItems = 0;
        state.totalPrice = 0;
      },
      addCartItem: (state, action) => {
        const findItem = state.items.find((obj)=>action.payload.id == obj.id);
        if(findItem){
            findItem.count++;
        }
        state.totalPrice = state.items.reduce((sum,obj)=>{           
            return sum + obj.price*obj.count;
    }, 0)
    state.totalItems = state.items.reduce((sum, obj)=>{
        return sum + obj.count
    }, 0)
  },
  removeCartItem: (state, action)=>{
    const findItem = state.items.find((obj)=>action.payload == obj.id);
    if(findItem.count>1){
        findItem.count--;
    }else{
        state.items = state.items.filter(obj=>obj.id != action.payload)
    }
    state.totalPrice = state.items.reduce((sum,obj)=>{           
        return sum + obj.price*obj.count;
}, 0)
state.totalItems = state.items.reduce((sum, obj)=>{
    return sum + obj.count
}, 0)
  },
      
    }
  })


  export const { addItem, removeItem, clearItems, removeCartItem, addCartItem } = cartSlice.actions

export default cartSlice.reducer