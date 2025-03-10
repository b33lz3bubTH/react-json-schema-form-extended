import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../../api";
import { RootState } from "../../store";
import { PaginationParams } from "../../../common/pagination.interface";

interface ProductListingState {
  loading: boolean;
  error: string | null;
  data: null | any;
  totalCount: number | null; // Total count of products
}

const initialState: ProductListingState = {
  loading: false,
  error: null,
  data: null,
  totalCount: 0,
};

export const listProducts = createAsyncThunk(
  "products/list",
  async (
    { take, skip, filter = {} }: PaginationParams & { filter: any },
    { getState, dispatch }
  ) => {
    try {
      // dispatch(getTotalProductCount(filter));
      const state: RootState = getState() as RootState;
      const apiKey = state.auth.apiKey;
      const response = await axios.post(
        Api.ProductListing({ take, skip }),
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

// Deprecated
// export const getTotalProductCount = createAsyncThunk(
//   "products/totalCount",
//   async ({ filter = {} }: { filter: any }, { getState }) => {
//     try {
//       const state: RootState = getState() as RootState;
//       const apiKey = state.auth.apiKey;
//       const response = await axios.post(Api.TotalProductCount(), filter, {
//         headers: {
//           "x-api-key": apiKey,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const productListingSlice = createSlice({
  name: "productListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.results;
        state.totalCount = action.payload.total;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message as string;
      });
    // .addCase(getTotalProductCount.pending, (state) => {
    //   // Handle pending action for total product count
    //   state.loading = true;
    //   state.totalCount = null;
    //   state.error = null;
    // })
    // .addCase(getTotalProductCount.fulfilled, (state, action) => {
    //   state.totalCount = action.payload; // Store the total count in the state
    // })
    // .addCase(getTotalProductCount.rejected, (state, action) => {
    //   // Handle rejected action for total product count
    //   state.loading = false;
    //   state.totalCount = null;
    //   state.error = action.error.message as string;
    // });
  },
});

export default productListingSlice.reducer;
