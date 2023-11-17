import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from "./userLocation.slice";
import searchLocationReducer from "./searchLocation.slice";

const reducer = combineReducers({
  userLocation: userLocationReducer,
  searchLocation: searchLocationReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
