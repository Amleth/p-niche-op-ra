import { configureStore } from '@reduxjs/toolkit'
import sparqlEndpoint from './services/sparqlEndpoint'

export const store = configureStore({
  reducer: {
    [sparqlEndpoint.reducerPath]: sparqlEndpoint.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sparqlEndpoint.middleware)
})
