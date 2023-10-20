import { debounce } from 'lodash'
import { useCallback, useEffect, useContext, useRef, useState, SetStateAction } from 'react'
import { PlaceType } from '../components/location-autocomplete/location-autocomplete'
import { GoogleApiLoaderContext } from '../context/googleApiLoader'

type AutocompletionRequest = google.maps.places.AutocompletionRequest

export const usePlaceAutocomplete = (input: string) => {
  const { isLoaded } = useContext(GoogleApiLoaderContext)
  const [options, setOptions] = useState<PlaceType[]>([])
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null)

  // init google places api AutocompleteService AFTER script is loaded
  // only run once, isLoaded will not change after loading
  useEffect(() => {
    isLoaded &&
      (autocompleteService.current =
        new google.maps.places.AutocompleteService())
  }, [isLoaded])

  useEffect(() => {
    getPlaces({ input, region: 'au' }, (options) => {
      // prevent options from returning null
      options ? setOptions(options) : setOptions([])
    })
  }, [input])

  const getPlaces = useCallback(
    debounce(
      (
        request: AutocompletionRequest,
        callback: (options: PlaceType[] | null) => void
      ) => {
        // when empty the input, return [] (show 'No location')
        request.input === ''
          ? setOptions([])
          : autocompleteService.current?.getPlacePredictions(request, callback)
      },
      400
    ),
    [isLoaded]
  )

  return { options, isLoaded }
}
