import { PREFIX } from '../../rdf'
export default (id, property) => `
PREFIX : <http://data-iremus.huma-num.fr/id/>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT
    ?f2
    ?u10
    ?title
    ?composition_date
    (GROUP_CONCAT(DISTINCT STR(?composer_name); separator=" ; ") as ?composers)
WHERE {
    GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
        VALUES ?id { <${PREFIX}${id}> }
        ?id rdf:type lrmoo:F2_Expression .
        ?f2 crm:P102_has_title/crm:P190_has_symbolic_content ?title .
        ?id ${property} ?f2 .
        ?f2 rdf:type lrmoo:F2_Expression .
        OPTIONAL { ?f2 doremus:U10_has_order_number ?u10 }
        OPTIONAL {
            ?f28 lrmoo:R17_created ?f2 .
            OPTIONAL {
                ?f28 crm:P9_consists_of ?sub_f28 .
                ?sub_f28 crm:P2_has_type :1d2f3f12-5bde-492e-a8ba-a3ac50652758 .
                ?sub_f28 crm:P14_carried_out_by ?composer .
                ?composer crm:P1_is_identified_by/crm:P190_has_symbolic_content ?composer_name .
                ?sub_f28 crm:P4_has_time-span/crm:P82_at_some_time_within ?composition_date .
            }
        }
    }
}
GROUP BY
    ?f2
    ?u10
    ?title
    ?composition_date
    ?type
    ?type_label
ORDER BY ?u10
`
