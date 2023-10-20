import { SxProps, Theme } from '@mui/material'

export const DARK_COLOR = 'rgb(108, 102, 109)';
export const LIGHT_COLOR = 'rgb(238, 216, 227)';

export const styles: Record<string, SxProps<Theme>> = {
  autocomplete: {
    '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
      backgroundColor: LIGHT_COLOR,
    },
    '& + .MuiAutocomplete-popper .MuiAutocomplete-option:active': {
      backgroundColor: LIGHT_COLOR,
    },
  },
  input: {
    '& .MuiAutocomplete-input': {
      cursor: 'pointer',
      boxSizing:'border-box',
    },
    '& .MuiAutocomplete-inputRoot': {
      position: 'relative',
      borderRadius: '16px',
      backgroundColor: 'white',
      color: DARK_COLOR,
      fontWeight: 600,
      fontSize: 20,
      padding: '24px 16px',
      '& fieldset': {
        borderColor: 'transparent',
        boxShadow: '1px 1px 2px rgba(0,0,0,0.25)',
      },
      '&:hover fieldset': {
        borderWidth: 3,
        borderColor: DARK_COLOR,
        boxShadow: 'none',
      },
      '&.Mui-focused fieldset': {
        borderWidth: 3,
        borderColor: DARK_COLOR,
        boxShadow: 'none',
      },
    },
  },
  icon: {
    marginRight: '8px',
  },
}
