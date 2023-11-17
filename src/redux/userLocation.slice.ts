import {
  PayloadAction,
  SliceCaseReducers,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { getGeocode, LatLng } from "use-places-autocomplete";
import { RootState } from "./store";
import { getNameByLatLng } from "../utils/dataTypeTransfer";

export interface LocationProp {
  city_name: string;
  latitude: number;
  longitude: number;
  view: Coordinate[];
}

export interface Coordinate {
  longitude: number;
  latitude: number;
}

export type LocationType =
  | {
      value: undefined;
      status: "idle";
      error: undefined;
    }
  | {
      value: undefined;
      status: "loading";
      error: undefined;
    }
  | {
      value: LocationProp;
      status: "succeeded";
      error: undefined;
    }
  | {
      value: undefined;
      status: "failed";
      error: string;
    };

export const initialLocationState: LocationType = {
  value: undefined,
  status: "idle",
  error: undefined,
};

export const setUserLocation = createAsyncThunk(
  "userLocation/getNameByLatLng",
  getNameByLatLng
);

const userLocationSlice = createSlice<
  LocationType,
  SliceCaseReducers<LocationType>
>({
  name: "userLocation",
  initialState: initialLocationState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setUserLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        setUserLocation.fulfilled,
        (state, action: PayloadAction<LocationProp>) => {
          state.status = "succeeded";
          state.value = action.payload;
        }
      )
      .addCase(setUserLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//selectors
export const selectUserLocation = createSelector(
  (state: RootState) => state.userLocation,
  (userLocation) => userLocation.value
);
export const selectUserLocationStatus = (state: RootState) =>
  state.userLocation.status;
//reducer
export default userLocationSlice.reducer;
