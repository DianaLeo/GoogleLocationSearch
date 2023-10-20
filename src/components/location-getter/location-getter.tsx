import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setSelectedLocation } from '../../redux/globalFilters.slice'
import { setLocation } from '../../redux/userLocation.slice'

const LocationGetter: FC = () => {
  const { selectedLocation } = useAppSelector((state) => state.globalFilters)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const isProximity = true
          dispatch(setLocation({ latitude, longitude, isProximity }))
          // only set current location to global state when first login
          if (selectedLocation) {
            return
          }
          // get address by location
          let address = ''
          const geocoder = new google.maps.Geocoder()
          geocoder
            .geocode({ location: { lat: latitude, lng: longitude } })
            .then(({ results }: google.maps.GeocoderResponse) => {
              if (results) {
                const filteredResults = results.filter((result) =>
                  result.types.includes('locality')
                )
                address = filteredResults[0].address_components[0].long_name
                dispatch(
                  setSelectedLocation({
                    city_name: address ?? 'Current Location',
                    latitude,
                    longitude,
                    view: [],
                  })
                )
                return
              }
              console.error('No address found by location')
            })
            .catch((e) => console.error('Geocoder failed due to: ' + e))
        },
        (error) => {
          console.error(error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [dispatch])

  return null
}

export default LocationGetter
