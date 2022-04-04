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
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PREFIX, values } from '../rdf'
import {
  useGetOeuvreEffectifsQuery,
  useGetOeuvreQuery,
  useGetOeuvreRolesQuery,
  useGetOeuvrePartsQuery
} from '../services/sparqlEndpoint'

export default () => {
  const urlParams = useParams()
  const getOeuvreQuery = useGetOeuvreQuery(urlParams.id)
  const getOeuvreEffectifsQuery = useGetOeuvreEffectifsQuery(urlParams.id)
  const getOeuvreRolesQuery = useGetOeuvreRolesQuery(urlParams.id)
  const getOeuvrePartsP165Query = useGetOeuvrePartsQuery({
    id: urlParams.id,
    property: 'crm:P165_incorporates'
  })
  const getOeuvrePartsP148Query = useGetOeuvrePartsQuery({
    id: urlParams.id,
    property: 'crm:P148_has_component'
  })
  const [oeuvre, setOeuvre] = useState([])
  const [effectifs, setEffectifs] = useState([])
  const [roles, setRoles] = useState([])
  const [p165, setP165] = useState([])
  const [p148, setP148] = useState([])

  useEffect(() => {
    if (getOeuvreQuery.status === 'fulfilled') {
      setOeuvre(values(getOeuvreQuery.data.results.bindings)[0])
    }
    if (getOeuvreEffectifsQuery.status === 'fulfilled') {
      setEffectifs(
        _.sortBy(values(getOeuvreEffectifsQuery.data.results.bindings), [
          'mop_label'
        ])
      )
    }
    if (getOeuvreRolesQuery.status === 'fulfilled') {
      setRoles(values(getOeuvreRolesQuery.data.results.bindings))
    }
    if (getOeuvrePartsP165Query.status === 'fulfilled') {
      setP165(
        values(getOeuvrePartsP165Query.data.results.bindings).map((o) => ({
          ...o,
          composition_date: new Date(o.composition_date)
            .getFullYear()
            .toString()
        }))
      )
    }
    if (getOeuvrePartsP148Query.status === 'fulfilled') {
      setP148(
        values(getOeuvrePartsP148Query.data.results.bindings).map((o) => ({
          ...o,
          composition_date: new Date(o.composition_date)
            .getFullYear()
            .toString()
        }))
      )
    }
  }, [
    urlParams,
    getOeuvreQuery,
    getOeuvreEffectifsQuery,
    getOeuvreRolesQuery,
    getOeuvrePartsP165Query,
    getOeuvrePartsP148Query
  ])

  let i = 0
  return (
    <Container>
      <Typography variant="h1" sx={{ mt: 3, mb: 3 }}>
        {oeuvre.title}
      </Typography>
      <Typography variant="h2">Propriétés</Typography>
      <TableContainer sx={{ m: 2, mb: 4 }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>{oeuvre.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date de composition</TableCell>
              <TableCell>
                {new Date(oeuvre.composition_date).getFullYear().toString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>
                {oeuvre.type_label || p165.length ? 'Œuvre composite' : ''}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Commentaire</TableCell>
              <TableCell>{oeuvre.comment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {roles.length > 0 && (
        <>
          <Typography variant="h2">Rôles</Typography>
          <TableContainer sx={{ m: 2, mb: 4 }}>
            <Table size="small">
              <TableBody>
                {roles.map((r) => (
                  <TableRow key={i++}>
                    <TableCell>{r.sub_f28_type_label}</TableCell>
                    <TableCell>{r.actor_label}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {effectifs.length > 0 && (
        <>
          <Typography variant="h2">Effectifs</Typography>
          <TableContainer sx={{ m: 2, mb: 4 }}>
            <Table size="small">
              <TableBody>
                {effectifs.map((e) => (
                  <TableRow key={i++}>
                    <TableCell>{e.mop_label}</TableCell>
                    <TableCell>{e.fqomop}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {p165.length > 0 && (
        <>
          <Typography variant="h2">Œuvres</Typography>
          <TableContainer sx={{ m: 2, mb: 4 }}>
            <Table size="small">
              <TableBody>
                {p165.map((f2) => (
                  <TableRow key={f2.f2}>
                    <TableCell>{f2.u10}</TableCell>
                    <TableCell>
                      <Link href={'/oeuvre/' + f2.f2.replace(PREFIX, '')}>
                        {f2.title}
                      </Link>
                    </TableCell>
                    <TableCell>{f2.composition_date}</TableCell>
                    <TableCell>{f2.composers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {p148.length > 0 && (
        <>
          <Typography variant="h2">Parties</Typography>
          <TableContainer sx={{ m: 2, mb: 4 }}>
            <Table size="small">
              <TableBody>
                {p148.map((f2) => (
                  <TableRow key={f2.f2}>
                    <TableCell>{f2.u10}</TableCell>
                    <TableCell>
                      <Link href={'/oeuvre/' + f2.f2.replace(PREFIX, '')}>
                        {f2.title}
                      </Link>
                    </TableCell>
                    <TableCell>{f2.composition_date}</TableCell>
                    <TableCell>{f2.composers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  )
}
