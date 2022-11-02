import { createTheme } from '@mui/material/styles'
import typography from './theme/typography'
import palette from './theme/palette'

// Create a theme instance.
const theme = createTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
})
export default theme
