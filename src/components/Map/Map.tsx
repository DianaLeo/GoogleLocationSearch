import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useState } from "react";
import { selectSearchLocation } from "../../redux/searchLocation.slice";
import { useAppSelector } from "../../redux/hooks";
import { defaultLocation } from "../../utils/constants";
import { GoogleApiLoaderContext } from "../../context/googleApiLoader";

interface Position {
  lat: number;
  lng: number;
}

const Map = () => {
  const searchLocation = useAppSelector(selectSearchLocation);
  const location = searchLocation ?? defaultLocation;

  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(12);
  const [center, setCenter] = useState<Position>({
    lat: location.latitude,
    lng: location.longitude,
  });
  const { isLoaded } = useContext(GoogleApiLoaderContext);

  useEffect(() => {
    setZoom(12);
    if (searchLocation) {
      setCenter({
        lat: searchLocation.latitude,
        lng: searchLocation.longitude,
      });
    }
  }, [searchLocation]);

  // update map center, zoom and view when dragging or zoom map
  const updateDragZoom = () => {
    if (map) {
      const newCenter = map.getCenter();
      const newBounds = map.getBounds();
      const currentZoom = map.getZoom() ?? zoom;

      if (newCenter && newBounds) {
        const mapCenter = newCenter.toJSON();
        setCenter(mapCenter);
        setZoom(currentZoom);
      }
    }
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={zoom}
          center={center}
          options={{
            clickableIcons: false,
            fullscreenControl: false,
            streetViewControl: false,
            minZoom: 4,
            maxZoom: 18,
          }}
          onLoad={setMap}
          onDragEnd={updateDragZoom}
          onZoomChanged={updateDragZoom}
        >
          <MarkerF position={center} />
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
