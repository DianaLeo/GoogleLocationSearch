import { PlaceType } from "../components/location-autocomplete/LocationAutocomplete";
import { LocationProp } from "../redux/userLocation.slice";

// For initializing locationValue in Location Autocomplete component
// This type must be compliant with Google Places API
const DEFAULT_CITY = "Sydney";

export const defaultLocation: LocationProp = {
  city_name: DEFAULT_CITY,
  latitude: -33.865143,
  longitude: 151.2099,
  view: [],
};

export const defaultGooglePlace: PlaceType = {
  description: "",
  matched_substrings: [],
  place_id: "",
  structured_formatting: {
    main_text: DEFAULT_CITY,
    main_text_matched_substrings: [],
    secondary_text: "",
  },
  terms: [],
  types: [],
};
