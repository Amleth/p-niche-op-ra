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
        ?f28 lrmoo:R17_created ?id .
        ?f28 rdf:type lrmoo:F28_Expression_Creation .
        ?f28 crm:P9_consists_of ?sub_f28 .
        ?sub_f28 rdf:type lrmoo:F28_Expression_Creation .
        ?sub_f28 crm:P2_has_type/crm:P1_is_identified_by ?sub_f28_type_label .
        ?sub_f28 crm:P14_carried_out_by ?actor .
        ?actor crm:P1_is_identified_by/crm:P190_has_symbolic_content ?actor_label .
    }
}
`
