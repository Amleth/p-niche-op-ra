import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Jost'],
    h1: {
      fontSize: '3rem'
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.3rem'
    }
  },
  palette: {
    mode: 'dark'
  }
})

export default theme
