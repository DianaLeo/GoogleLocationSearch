import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface LocationProp {
  city_name: string
  latitude: number
  longitude: number
  view: Coordinate[]
}

interface Coordinate {
  longitude: number
  latitude: number
}

interface MapProp {
  zoom: number
}
interface IGlobalFiltersState {
  selectedCategoryId: number
  selectedLocation: LocationProp | undefined
  storedMapState: MapProp | undefined
}

const initialState: IGlobalFiltersState = {
  selectedCategoryId: 0,
  selectedLocation: undefined,
  storedMapState: undefined,
}

const globalFiltersSlice = createSlice({
  name: 'globalFilters',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategoryId = action.payload
    },
    setSelectedLocation: (state, action: PayloadAction<LocationProp>) => {
      state.selectedLocation = {
        ...state.selectedLocation,
        ...action.payload,
      }
    },
    setMapState: (state, action: PayloadAction<MapProp>) => {
      state.storedMapState = {
        ...state.storedMapState,
        ...action.payload,
      }
    },
  },
})

export const selectedLocation = (state: RootState) =>
  state.globalFilters.selectedLocation
export const { setSelectedCategory, setSelectedLocation, setMapState } =
  globalFiltersSlice.actions
export default globalFiltersSlice.reducer
