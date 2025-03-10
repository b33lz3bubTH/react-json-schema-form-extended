// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  apiKey: string | null;
}

const initialState: AuthState = {
  apiKey: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { setApiKey } = authSlice.actions;
export default authSlice.reducer;
