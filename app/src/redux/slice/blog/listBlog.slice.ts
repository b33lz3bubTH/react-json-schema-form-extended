import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";
import { PaginationParams } from "../../../common/pagination.interface";

interface ListingState {
  loading: boolean;
  error: string | null;
  data: null | any;
  totalCount: number | null;
}
const reduxSlice = `blog`;
const initialState: ListingState = {
  loading: false,
  error: null,
  data: null,
  totalCount: 0,
};

export const thunkApiState = createAsyncThunk(
  `${reduxSlice}/list`,
  async (
    { take, skip, filter = {} }: PaginationParams & { filter: any },
    { getState, dispatch }
  ) => {
    try {
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(
        Api.BlogListing({ take, skip }),
        filter,
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

const slice = createSlice({
  name: `${reduxSlice}Listing`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkApiState.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(thunkApiState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.results;
        state.totalCount = action.payload.total;
      })
      .addCase(thunkApiState.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default slice.reducer;
