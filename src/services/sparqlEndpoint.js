import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getOeuvres from './sparqlQueries/oeuvres'
import getOeuvre from './sparqlQueries/oeuvre'
import getOeuvreEffectifs from './sparqlQueries/oeuvre_effectifs'
import getOeuvreRoles from './sparqlQueries/oeuvre_roles'
import getOeuvreParts from './sparqlQueries/oeuvre_parts'
import getWorkPerformances from './sparqlQueries/work_performances'
import getWorkPerformance from './sparqlQueries/work_performance'

const sparqlEndpoint = createApi({
  reducerPath: 'sparqlEndpoint',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://data-iremus.huma-num.fr/sparql'
    baseUrl: 'http://localhost:3030/iremus/sparql'
  }),
  endpoints: (builder) => ({
    getOeuvres: builder.query({
      query: () => ({
        method: 'POST',
        body: new URLSearchParams({ query: getOeuvres() })
      })
    }),
    getOeuvre: builder.query({
      query: (id) => ({
        method: 'POST',
        body: new URLSearchParams({ query: getOeuvre(id) })
      })
    }),
    getOeuvreEffectifs: builder.query({
      query: (id) => ({
        method: 'POST',
        body: new URLSearchParams({ query: getOeuvreEffectifs(id) })
      })
    }),
    getOeuvreRoles: builder.query({
      query: (id) => ({
        method: 'POST',
        body: new URLSearchParams({ query: getOeuvreRoles(id) })
      })
    }),
    getOeuvreParts: builder.query({
      query: (arg) => {
        const { id, property } = arg
        return {
          method: 'POST',
          body: new URLSearchParams({ query: getOeuvreParts(id, property) })
        }
      }
    }),
    getWorkPerformances: builder.query({
      query: (id) => ({
        method: 'POST',
        body: new URLSearchParams({ query: getWorkPerformances(id) })
      })
    }),
    getWorkPerformance: builder.query({
      query: (id) => ({
        method: 'POST',
        body: new URLSearchParams({ query: getWorkPerformance(id) })
      })
    })
  })
})

export default sparqlEndpoint
export const {
  useGetOeuvresQuery,
  useGetOeuvreQuery,
  useGetOeuvreEffectifsQuery,
  useGetOeuvreRolesQuery,
  useGetOeuvrePartsQuery,
  useGetWorkPerformances,
  useGetWorkPerformance
} = sparqlEndpoint
