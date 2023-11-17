import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { FC, PropsWithChildren, createContext } from "react";

type GoogleApiLoaderState = ReturnType<typeof useJsApiLoader>;

const INITIAL_STATE: GoogleApiLoaderState = {
  isLoaded: false,
  loadError: undefined,
};

const GOOGLEMAP_API_KEY = "GOOGLE_API_KEY";

const LIBRARIES: Libraries = ["places", "maps"];

export const GoogleApiLoaderContext = createContext(INITIAL_STATE);

export const GoogleApiLoaderProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  // load the google places api script BEFORE rendering pages
  const result = useJsApiLoader({
    id: "google-place-script",
    googleMapsApiKey: GOOGLEMAP_API_KEY,
    libraries: LIBRARIES,
  });

  return (
    <GoogleApiLoaderContext.Provider
      value={{
        isLoaded: result.isLoaded,
        loadError: result.loadError,
      }}
    >
      {children}
    </GoogleApiLoaderContext.Provider>
  );
};
