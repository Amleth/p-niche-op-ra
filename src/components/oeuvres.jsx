import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { useGetOeuvresQuery } from '../services/sparqlEndpoint'
import { PREFIX, values } from '../rdf'

const COLUMNS = [
  {
    field: 'title',
    flex: 1,
    headerName: 'Titre'
  },
  {
    field: 'composition_date',
    flex: 1,
    headerName: 'Date'
  },
  {
    field: 'composers',
    flex: 1,
    headerName: 'Compositeur·ice·s'
  },
  {
    field: 'type_label',
    flex: 1,
    headerName: 'Type'
  },
  {
    field: 'n_incorporated',
    flex: 1,
    headerName: 'Œuvres'
  },
  {
    field: 'n_components',
    flex: 1,
    headerName: 'Parties'
  }
]

export default () => {
  const navigate = useNavigate()

  const [oeuvres, setOeuvres] = useState([])
  const getOeuvresQuery = useGetOeuvresQuery()

  useEffect(() => {
    if (getOeuvresQuery.status === 'fulfilled') {
      setOeuvres(
        _.sortBy(values(getOeuvresQuery.data.results.bindings), ['title']).map(
          (o) => ({
            ...o,
            composition_date: new Date(o.composition_date)
              .getFullYear()
              .toString()
          })
        )
      )
    }
  }, [getOeuvresQuery])

  return (
    <Box sx={{ height: '100vh' }}>
      <DataGrid
        columns={COLUMNS}
        rows={oeuvres}
        editable={false}
        sortingOrder={['asc', 'desc']}
        onRowClick={(rowData) =>
          navigate('/oeuvre/' + rowData.id.replace(PREFIX, ''))
        }
      />
    </Box>
  )
}
