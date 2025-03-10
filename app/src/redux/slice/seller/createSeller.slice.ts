import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";

interface SellerCreationState {
  loading: boolean;
  error: string | null;
  data: null | any;
}

const initialState: SellerCreationState = {
  loading: false,
  error: null,
  data: null,
};

export const createSeller = createAsyncThunk(
  "sellers/create",
  async (sellerData: any, { getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(Api.SellerCreate(), sellerData, {
        headers: {
          "x-key": apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const sellerCreationSlice = createSlice({
  name: "sellerCreation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        console.log(`actionL `, action.payload);
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default sellerCreationSlice.reducer;
