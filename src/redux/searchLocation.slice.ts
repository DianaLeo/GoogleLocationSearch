import {
  SliceCaseReducers,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { LocationType, initialLocationState } from "./userLocation.slice";
import { getLatLngById, getNameByLatLng } from "../utils/dataTypeTransfer";

export const setSearchLocationById = createAsyncThunk(
  "searchLocation/getLatLngById",
  getLatLngById,
);

export const setSearchLocationByLatLng = createAsyncThunk(
  "searchLocation/getNameByLatLng",
  getNameByLatLng,
);

const searchLocationSlice = createSlice<
  LocationType,
  SliceCaseReducers<LocationType>
>({
  name: "searchLocation",
  // State type and initialState are the same as userLocation.slice
  initialState: initialLocationState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setSearchLocationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSearchLocationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(setSearchLocationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setSearchLocationByLatLng.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSearchLocationByLatLng.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If user has already searched a location (state.value is not undefined),
        // then allowing location share will do nothing to searchLocation
        if (!state.value?.city_name){
          state.value = action.payload;
        }
      })
      .addCase(setSearchLocationByLatLng.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//selectors
export const selectSearchLocation = createSelector(
  (state: RootState) => state.searchLocation,
  (searchLocation) => searchLocation.value
);
// export const selectSearchLocation = 
//   (state: RootState) => state.searchLocation.value
//reducer
export default searchLocationSlice.reducer;
