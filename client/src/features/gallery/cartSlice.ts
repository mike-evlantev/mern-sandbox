import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: number[];
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
        state.items = [...state.items, action.payload];        
    },
    remove: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(id => id !== action.payload);
    },
    reset: (state) => {
      state = initialState;
    }
  }
});

export const { add, remove, reset } = cartSlice.actions;
export default cartSlice.reducer;