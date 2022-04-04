import {
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PREFIX, values } from '../rdf'
import { useGetWorkPerformanceQuery } from '../services/sparqlEndpoint'

export default function () {
  const urlParams = useParams()
  const getWorkPerformanceQuery = useGetWorkPerformanceQuery(urlParams.id)

  const [data, setData] = useState([])

  useEffect(() => {
    if (getWorkPerformanceQuery.status === 'fulfilled') {
      setData(values(getWorkPerformanceQuery.data.results.bindings))
    }
  }, [getWorkPerformanceQuery])

  return (
    <Container>
      <Typography variant="h1" sx={{ mt: 3, mb: 3 }}>
        Représentation{' '}
        {data.length > 0
          ? data[0].f31_place_label +
            ' — ' +
            new Date(data[0].f31_p82).toLocaleDateString('fr-FR')
          : ''}
      </Typography>
      {data.length > 0 && (
        <Table size="small">
          <TableBody>
            {data.map((m28) => (
              <TableRow key={m28.m28}>
                <TableCell>{m28.m42_type_label}</TableCell>
                <TableCell>{m28.m28_actor_label}</TableCell>
                <TableCell>{m28.m14_label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  )
}
