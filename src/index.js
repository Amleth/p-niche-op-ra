import { AppBar, Button, CssBaseline, Toolbar } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Oeuvre from './components/oeuvre'
import Oeuvres from './components/oeuvres'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import theme from './theme'
import './index.css'
import Representation from './components/representation'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Button href="/oeuvres" variant="outlined">
            Œuvres
          </Button>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" />
            <Route path="oeuvres" element={<Oeuvres />} />
            <Route path="oeuvre/:id" element={<Oeuvre />} />
            <Route path="representation/:id" element={<Representation />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
