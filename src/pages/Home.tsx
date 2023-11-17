import LocationAutocomplete from "../components/location-autocomplete";
import Map from "../components/Map";
import { Box, SxProps, Theme } from "@mui/material";
import Instructions from "../components/Instructions";
import LocationGetter from "../components/LocationGetter/LocationGetter";

const Home = () => {
  return (
    <Box sx={styles.homeContainer}>
      <LocationGetter />
      <Box sx={styles.autocompleteContainer}>
        <LocationAutocomplete />
      </Box>
      <Box sx={styles.mapContainer}>
        <Map />
      </Box>
      <Instructions />
    </Box>
  );
};

const styles: Record<string, SxProps<Theme>> = {
  homeContainer: {
    position: "relative",
    overflow: "hidden",
  },
  autocompleteContainer: {
    position: "absolute",
    top: 150,
    left: "10%",
    width: "80%",
    zIndex: 2,
  },
  mapContainer: {
    width: "100%",
    height: "100vh",
  },
};

export default Home;
