import React, { useState, useEffect } from "react";
import { usePlaceAutocomplete } from "../../utils/usePlaceAutocomplete";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LocationAutocompleteListBody from "./LocationAutocompleteBody";
import {
  selectSearchLocation,
  setSearchLocationById,
} from "../../redux/searchLocation.slice";
import { defaultGooglePlace } from "../../utils/constants";
import { cloneDeep } from "lodash";

export type PlaceType = google.maps.places.AutocompletePrediction;

const LocationAutocomplete: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchCity = useAppSelector(selectSearchLocation)?.city_name;
  const [locationValue, setLocationValue] =
    useState<PlaceType>(defaultGooglePlace);
  const [input, setInput] = useState(searchCity ?? "Sydney");

  // get options on every render:
  // when the component is mounted, and when input state change
  const { options, isLoaded } = usePlaceAutocomplete(input);

  // When user allow location share, searchCity is set to useCity (before user search anything), change location value
  useEffect(() => {
    if (searchCity) {
      const deepCopy = cloneDeep(defaultGooglePlace);
      deepCopy.structured_formatting.main_text = searchCity;
      setLocationValue(deepCopy);
    }
  }, [searchCity]);

  const onChangeHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string | PlaceType | null
  ) => {
    if (!newValue) {
      return undefined;
    }
    if (typeof newValue === "string") {
      return setInput(newValue);
    }
    setLocationValue(newValue);
    dispatch(setSearchLocationById(newValue));
  };

  const onInputChangeHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    newInput: string
  ) => {
    setInput(newInput);
  };

  return (
    <div className="autocompleteContainer">
      {isLoaded && (
        <LocationAutocompleteListBody
          inputValue={input}
          locationValue={locationValue}
          options={options}
          onChangeHandler={onChangeHandler}
          onInputChangeHandler={onInputChangeHandler}
        />
      )}
    </div>
  );
};

export default LocationAutocomplete;
