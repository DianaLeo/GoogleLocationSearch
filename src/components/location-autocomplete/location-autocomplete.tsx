import React, { useState, useEffect } from 'react'
import { usePlaceAutocomplete } from '../../utils/usePlaceAutocomplete'
import { setSelectedLocation } from '../../redux/globalFilters.slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import LocationAutocompleteListBody from './location-autocomplete-list-body'
import LocationGetter from '../location-getter/location-getter'

export type PlaceType = google.maps.places.AutocompletePrediction

const LocationAutocomplete: React.FC = () => {
  const { selectedLocation } = useAppSelector((state) => state.globalFilters)
  const dispatch = useAppDispatch()

  const initialLocationValue: PlaceType = {
    description: '',
    matched_substrings: [],
    place_id: '',
    structured_formatting: {
      main_text: selectedLocation?.city_name ?? 'Sydney',
      main_text_matched_substrings: [],
      secondary_text: '',
    },
    terms: [],
    types: [],
  }
  const [locationValue, setLocationValue] = useState<PlaceType | null>(
    initialLocationValue
  )
  const [input, setInput] = useState(selectedLocation?.city_name ?? 'Sydney')
  // get options on every render:
  // when the component is mounted, and when input state change
  const { options, isLoaded } = usePlaceAutocomplete(input)

  // When user allow location share (or set selected location), change input value
  useEffect(() => {
    if (selectedLocation?.city_name) {
      setInput(selectedLocation?.city_name)
      setLocationValue(initialLocationValue)
    }
  }, [selectedLocation?.city_name])

  const onChangeHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: PlaceType | null
  ) => {
    setLocationValue(newValue)
    // On value chance, set selected location
    //Get location by place_id, and set selected location
    if (locationValue?.place_id) {
      const geocoder = new google.maps.Geocoder()
      geocoder
        .geocode({ placeId: locationValue.place_id })
        .then(({ results }: google.maps.GeocoderResponse) => {
          if (results[0]) {
            console.log('setSelectedLocation', results[0])
            const address = locationValue.structured_formatting.main_text
            const latitude = results[0].geometry.location.lat()
            const longitude = results[0].geometry.location.lng()
            const locationProps = {
              city_name: address,
              longitude: longitude,
              latitude: latitude,
              view: [],
            }
            dispatch(setSelectedLocation(locationProps))
            return
          }
          console.error('No results found by place_id' + locationValue.place_id)
        })
        .catch((e) => console.error('Geocoder failed due to: ' + e))
    }
  }
  const onInputChangeHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    newInput: string
  ) => {
    setInput(newInput)
  }


  return (
    <div className='autocompleteContainer'>
      <LocationGetter/>
      {isLoaded && (
      <LocationAutocompleteListBody
        locationValue={locationValue}
        options={options}
        onChangeHandler={onChangeHandler}
        onInputChangeHandler={onInputChangeHandler}
      />
      )}
    </div>
  )

}

export default LocationAutocomplete
