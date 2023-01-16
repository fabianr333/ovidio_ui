import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrandDataService from "../services/brand.service";

const initialState = [];

export const retrieveBrands = createAsyncThunk(
  "brands/retrieve",
  async () => {
    const res = await BrandDataService.getAll();
    return res.data;
  }
);

    
const brandSlice = createSlice({
name: "brand",
initialState,
extraReducers: {
    [retrieveBrands.fulfilled]: (state, action) => {
    return [...action.payload];
    },
},
});
  
  const { reducer } = brandSlice;
  export default reducer;
