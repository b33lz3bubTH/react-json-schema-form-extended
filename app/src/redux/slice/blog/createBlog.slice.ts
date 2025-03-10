import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";

interface CreationState {
  loading: boolean;
  error: string | null;
  data: null | any;
}

const initialState: CreationState = {
  loading: false,
  error: null,
  data: null,
};
const reduxSlice = `Blog`;

export const thunkApiState = createAsyncThunk(
  `${reduxSlice}/create`,
  async ({ data }: { data: any }, { getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(Api.BlogCreate(), data, {
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

const slice = createSlice({
  name: `${reduxSlice}Creation`,
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
        console.log(`${reduxSlice} actionL `, action.payload);
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(thunkApiState.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
  },
});

export default slice.reducer;
