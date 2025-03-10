// store.ts
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./slice/root.reducer";
import apiMiddleware from "./middlewares/auth.middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), apiMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
