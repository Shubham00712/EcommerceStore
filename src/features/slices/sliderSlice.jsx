import {createSlice, configureStore} from '@reduxjs/toolkit';
import { sliderData } from '../../assets/sliderdata';

export const sliderSlice= createSlice({
    name: 'slider',
    initialState:{
        value: 0,
        total: sliderData.length-1
    },
    reducers:{
        prevslide(state, action){
            state.value = action.payload < 0 ? state.total : action.payload
        },
        nextslide(state,action){
            state.value = action.payload > state.total ? 0 : action.payload
        },
        dotslide(state,action){
            state.value = action.payload
        }
    }
})

export const {nextslide, prevslide,dotslide} = sliderSlice.actions;
export default sliderSlice.reducer;