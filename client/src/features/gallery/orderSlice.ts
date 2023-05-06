import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { narrowError } from "../../utils/errorUtils";
import { orderService } from "./orderService";
import { GalleryOrder } from "../../types/GalleryOrder";

interface OrderState extends GalleryOrder {
    loading: boolean;
}

const initialState: OrderState = {
    first: '', 
    last: '', 
    email: '', 
    phone: '', 
    address1: '', 
    address2: '', 
    city: '', 
    state: '', 
    zip: '',
    id: '',
    items: [],
    error: undefined,
    loading: false,
    total: 0,
    paymentIntent: '',
    createdAt: ''
}

// Add order
export const addOrder = createAsyncThunk(
    'order/add',
    async(order: Partial<GalleryOrder>, thunkAPI) => {
        try {
            const result = await orderService.add(order);
            await thunkAPI.dispatch(update(result));
        } catch (error) {
            const message = narrowError(error);
            return thunkAPI.rejectWithValue(message);
        }
    });

// Update order
export const updateOrder = createAsyncThunk(
    'order/update',
    async(order: Partial<GalleryOrder>, thunkAPI) => {
        try {
            await orderService.update(order);
        } catch (error) {
            const message = narrowError(error);
            return thunkAPI.rejectWithValue(message);
        }
    });

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // updateGuest: (state, action: PayloadAction<Guest>) => {
        //     state = {...state, ...action.payload};
        // },
        // updateError: (state, action: PayloadAction<StripeError>) => {
        //     state.error = action.payload;
        // },
        update: (state, action: PayloadAction<Partial<GalleryOrder>>) => {
            console.log('updating to...', {...state, ...action.payload})
            return state = {...state, ...action.payload};
        },
        addItem: (state, action: PayloadAction<number>) => {
            state.items = [...state.items, action.payload];        
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(id => id !== action.payload);
        },
        reset: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrder.pending, (state) => { state.loading = true })
            .addCase(addOrder.fulfilled, (state, action: PayloadAction<any>) => {
                return {...state, loading: false, error: undefined, ...action.payload};
            })
            .addCase(addOrder.rejected, (state, action: PayloadAction<any>) => { 
                return {...state, loading: false, error: action.payload};
            })
            .addCase(updateOrder.pending, (state) => { state.loading = true })
            .addCase(updateOrder.fulfilled, (state, action: PayloadAction<any>) => {
                return {...state, loading: false, error: undefined, ...action.payload};
            })
            .addCase(updateOrder.rejected, (state, action: PayloadAction<any>) => { 
                return {...state, loading: false, error: action.payload};
            });
    }
});

export const { addItem, removeItem, reset, update } = orderSlice.actions;
export default orderSlice.reducer;