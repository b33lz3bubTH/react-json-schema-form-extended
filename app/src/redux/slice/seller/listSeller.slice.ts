import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";
import { PaginationParams } from "../../../common/pagination.interface";

interface SellerListingState {
  loading: boolean;
  error: string | null;
  data: null | any;
  totalCount: number | null;
}

const initialState: SellerListingState = {
  loading: false,
  error: null,
  data: null,
  totalCount: 0,
};

export const listSeller = createAsyncThunk(
  "sellers/list",
  async ({ take, skip }: PaginationParams, { getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(
        Api.SellerListing({ take, skip }),
        null,
        {
          headers: {
            "x-key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const sellerListingSlice = createSlice({
  name: "sellerListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(listSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.results;
        state.totalCount = action.payload.total;
      })
      .addCase(listSeller.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default sellerListingSlice.reducer;
