import { combineReducers, configureStore } from "@reduxjs/toolkit";
import checkReducer from "@/redux/slices/CheckoutSlice";

const rootReducer = combineReducers({
  checkout:checkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
