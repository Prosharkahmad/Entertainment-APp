import { createSlice } from "@reduxjs/toolkit";

export const moviesReducer=createSlice({
    name:"movies",
    initialState:{
        moviesObj:[],
    },
    reducers:{
        moviesObj:(state,action)=>{
            
        }
    },
});
export const {moviesObj}=moviesReducer.actions;
export default moviesReducer.reducer;