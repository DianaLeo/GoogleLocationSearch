import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";
import { PlaceType } from "../components/location-autocomplete/LocationAutocomplete";

// userLocation slice and searchLocation slice need to use the same function
// Get city_name/suburb by lat lng
export const getNameByLatLng = async ({ lat, lng }: LatLng) => {
  const results = await getGeocode({ location: { lat, lng } });
  const filteredResults = results.filter((result: google.maps.GeocoderResult) =>
    result.types.includes("locality")
  );
  const city_name = filteredResults[0].address_components[0].long_name;
  return { city_name, latitude: lat, longitude: lng, view: [] };
};

// Get location by place_id
export const getLatLngById = async (place: PlaceType) => {
  const city_name = place.structured_formatting.main_text;
  const result = await getGeocode({ placeId: place.place_id });
  const { lat, lng } = getLatLng(result[0]);
  return { city_name, latitude: lat, longitude: lng, view: [] };
};
