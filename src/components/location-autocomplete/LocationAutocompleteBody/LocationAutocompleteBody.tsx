import { Autocomplete, TextField } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { autocompleteBodystyles } from "./LocationAutocompleteBodyStyles";
import { SyntheticEvent } from "react";
import LocationAutocompleteOption from "../LocationAutocompleteOption";
import { PlaceType } from "../LocationAutocomplete";

type Props = {
  inputValue: string;
  locationValue: PlaceType | null;
  options: readonly PlaceType[];
  onChangeHandler: (
    event: SyntheticEvent<Element, Event>,
    newValue: string | PlaceType | null
  ) => void;
  onInputChangeHandler: (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => void;
};

const LocationAutocompleteBody = ({
  inputValue,
  locationValue,
  options,
  onChangeHandler,
  onInputChangeHandler,
}: Props) => {
  return (
    <>
      <Autocomplete
        id="google-map-demo"
        fullWidth
        blurOnSelect
        freeSolo
        disablePortal
        sx={autocompleteBodystyles.autocomplete}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.structured_formatting.main_text
        }
        isOptionEqualToValue={(option, value) =>
          option.structured_formatting.main_text ===
          value.structured_formatting.main_text
        }
        options={options}
        inputValue={inputValue}
        value={locationValue}
        noOptionsText="No locations"
        onChange={onChangeHandler}
        onInputChange={onInputChangeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="where are you going"
            sx={autocompleteBodystyles.input}
            InputProps={{
              ...params.InputProps,
              endAdornment: null,
              startAdornment: (
                <LocationOnOutlinedIcon sx={autocompleteBodystyles.icon} />
              ),
            }}
          />
        )}
        ListboxProps={{
          style: {
            width: "100%",
            maxHeight: 600,
          },
        }}
        renderOption={(props, option) => (
          <LocationAutocompleteOption
            key={option.place_id}
            props={props}
            option={option}
          />
        )}
      />
    </>
  );
};

export default LocationAutocompleteBody;
