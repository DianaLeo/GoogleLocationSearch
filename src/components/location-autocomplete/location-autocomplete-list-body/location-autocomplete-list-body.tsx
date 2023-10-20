import { Autocomplete, TextField } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { styles } from './location-autocomplete-list-body-styles'
import { SyntheticEvent } from 'react'
import LocationAutocompleteListOption from '../location-autocomplete-list-option'
import { PlaceType } from '../location-autocomplete'

type Props = {
  locationValue: PlaceType | null
  options: readonly PlaceType[]
  onChangeHandler: (
    event: SyntheticEvent<Element, Event>,
    newValue: PlaceType | null
  ) => void
  onInputChangeHandler: (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => void
}

const LocationAutocompleteListBody = ({
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
        // Customize dropdown position
        // PopperComponent={(props: PopperProps) => {
        //   const anchorEl = anchor.current
        //   return (
        //     <Popper
        //       {...props}
        //       anchorEl={anchorEl}
        //       style={{
        //         width: anchorEl?.clientWidth,
        //       }}
        //       placement="bottom"
        //     />
        //   )
        // }}
        disablePortal
        sx={styles.autocomplete}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : option.structured_formatting.main_text
        }
        isOptionEqualToValue={(option, value) =>
          option.structured_formatting.main_text ===
          value.structured_formatting.main_text
        }
        options={options}
        value={locationValue}
        noOptionsText="No locations"
        onChange={onChangeHandler}
        onInputChange={onInputChangeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="where are you going"
            sx={styles.input}
            InputProps={{
              ...params.InputProps,
              endAdornment: null,
              startAdornment: <LocationOnOutlinedIcon sx={styles.icon} />,
            }}
          />
        )}
        ListboxProps={{
          style: {
            width: '100%',
            maxHeight: 600,
          },
        }}
        renderOption={(props, option) => (
          <LocationAutocompleteListOption
            key={option.place_id}
            props={props}
            option={option}
          />
        )}
      />
    </>
  )
}

export default LocationAutocompleteListBody
