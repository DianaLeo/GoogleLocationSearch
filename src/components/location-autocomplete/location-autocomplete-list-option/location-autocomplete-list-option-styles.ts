import { SxProps, Theme } from '@mui/material'
import { DARK_COLOR } from '../location-autocomplete-list-body/location-autocomplete-list-body-styles'

export const styles: Record<string, SxProps<Theme>> = {
  option: {
    minHeight: 71,
    borderBottom: {
      tablet: '1px solid rgba(0,0,0,0.25)',
      mobile: '0.2px solid rgba(0,0,0,0.02)',
    },
    padding: '12px 16px',
  },
  iconWrapper: {
    display: 'flex',
    width: 44,
  },
  icon: {
    marginRight: '8px',
    width: 28,
    height: 28,
  },
  addressWrapper: {
    width: 'calc(100% - 44px)',
    wordWrap: 'break-word',
    padding: '12px 0',
  },
  addressMainText: {
    color: DARK_COLOR,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 1.21,
    marginBottom: '4px',
  },
  addressSecondaryText: {
    color: DARK_COLOR,
    fontSize: 16,
    lineHeight: 1.21,
  },
}
