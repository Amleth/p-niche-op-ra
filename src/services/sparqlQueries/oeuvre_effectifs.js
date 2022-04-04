import { PREFIX } from '../../rdf'

export default (id) => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT *
WHERE {
    GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
        VALUES ?id { <${PREFIX}${id}> }
        ?id doremus:U13_has_casting ?m6 .
        ?m6 rdf:type doremus:M6_Casting .
        ?m6 doremus:U23_has_casting_detail ?m23 .
        ?m23 rdf:type doremus:M23_Casting_Detail .
        OPTIONAL { ?m23 doremus:U30_foresees_quantity_of_medium_of_performance ?fqomop }
        OPTIONAL { 
            ?m23 doremus:U2_foresees_use_of_medium_of_performance ?fuomop .
            ?fuomop rdf:type doremus:M14_Medium_of_Performance .
            ?fuomop crm:P1_is_identified_by ?mop_label .
        }
    }
}
`
