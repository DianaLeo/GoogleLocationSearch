import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface LocationState {
  latitude: number
  longitude: number
  isProximity: boolean
}
interface ILocationFilterState {
  location: LocationState | undefined
}

const initialState: ILocationFilterState = {
  location: undefined,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.location = {
        ...state.location,
        ...action.payload,
      }
    },
  },
})

export const { setLocation } = locationSlice.actions
export const location = (state: RootState) => state.location.location
export default locationSlice.reducer
