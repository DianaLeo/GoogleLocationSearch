import { Grid, ListItem, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { styles } from './location-autocomplete-list-option-styles'
import { PlaceType } from '../location-autocomplete'

type Props = {
  props: React.HTMLAttributes<HTMLLIElement>
  option: PlaceType
}

const LocationAutocompleteListOption = ({ props, option }: Props) => {
  return (
    <ListItem {...props} sx={styles.option}>
      <Grid item sx={styles.iconWrapper}>
        <LocationOnOutlinedIcon sx={styles.icon} />
      </Grid>
      <Grid item sx={styles.addressWrapper}>
        <Typography sx={styles.addressMainText}>
          {option.structured_formatting.main_text}
        </Typography>
        <Typography sx={styles.addressSecondaryText}>
          {option.structured_formatting.secondary_text}
        </Typography>
      </Grid>
    </ListItem>
  )
}

export default LocationAutocompleteListOption
