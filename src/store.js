import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import sliderReducer from './features/slices/sliderSlice';
import itemsReducer from './features/slices/itemsSlice';
import cartReducer from './features/slices/cartSlice';

export const store = configureStore({
    reducer:{
        slider: sliderReducer,
        items: itemsReducer,
        cart:cartReducer
    }
},createAsyncThunk)