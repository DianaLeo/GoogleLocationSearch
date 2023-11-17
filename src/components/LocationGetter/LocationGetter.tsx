import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GoogleApiLoaderContext } from "../../context/googleApiLoader";
import { setUserLocation } from "../../redux/userLocation.slice";
import {
  selectSearchLocation,
  setSearchLocationByLatLng,
} from "../../redux/searchLocation.slice";

const LocationGetter: FC = () => {
  const dispatch = useAppDispatch();
  const searchLocation = useAppSelector(selectSearchLocation);
  const { isLoaded } = useContext(GoogleApiLoaderContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (isLoaded) {
            dispatch(setUserLocation({ lat: latitude, lng: longitude }));
            // cannot determine if searchLocation has value here
            // because we are waiting for the async function to be resolved
            // thread is hanging here
            // at the moment getCurrentPosition was called, searchLocation is always undefined
            // So we have to solve the determination inside setSearchLocationByLatLng
            dispatch(
              setSearchLocationByLatLng({ lat: latitude, lng: longitude })
            );
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [dispatch, isLoaded]);

  return null;
};

export default LocationGetter;
