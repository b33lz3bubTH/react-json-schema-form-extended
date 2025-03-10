import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";

interface ProductCreationState {
  loading: boolean;
  error: string | null;
  data: null | any;
}

const initialState: ProductCreationState = {
  loading: false,
  error: null,
  data: null,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: any, { getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(Api.ProductCreate(), productData, {
        headers: {
          "x-key": apiKey,
        },
      });
      console.log(`response: `, response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productCreationSlice = createSlice({
  name: "productCreate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default productCreationSlice.reducer;
