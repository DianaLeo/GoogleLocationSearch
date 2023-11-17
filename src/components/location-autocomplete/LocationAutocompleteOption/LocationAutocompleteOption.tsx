import { Grid, ListItem, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PlaceType } from "../LocationAutocomplete";
import { SxProps, Theme } from "@mui/material";
import { DARK_COLOR } from "../LocationAutocompleteBody/LocationAutocompleteBodyStyles";

type Props = {
  props: React.HTMLAttributes<HTMLLIElement>;
  option: PlaceType;
};

const LocationAutocompleteOption = ({ props, option }: Props) => {
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
  );
};

const styles: Record<string, SxProps<Theme>> = {
  option: {
    minHeight: 71,
    borderBottom: {
      tablet: "1px solid rgba(0,0,0,0.25)",
      mobile: "0.2px solid rgba(0,0,0,0.02)",
    },
    padding: "12px 16px",
  },
  iconWrapper: {
    display: "flex",
    width: 44,
  },
  icon: {
    marginRight: "8px",
    width: 28,
    height: 28,
  },
  addressWrapper: {
    width: "calc(100% - 44px)",
    wordWrap: "break-word",
    padding: "12px 0",
  },
  addressMainText: {
    color: DARK_COLOR,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 1.21,
    marginBottom: "4px",
  },
  addressSecondaryText: {
    color: DARK_COLOR,
    fontSize: 16,
    lineHeight: 1.21,
  },
};

export default LocationAutocompleteOption;
