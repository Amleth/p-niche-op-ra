export default (id) => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT *
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
    VALUES ?id { <${PREFIX}${id}> }
  }
}
`
