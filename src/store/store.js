import { configureStore } from "@reduxjs/toolkit";
import { autReducer } from "../store/authSlice";

const store = configureStore({
  reducer: { autReducer },
});

export default store;
