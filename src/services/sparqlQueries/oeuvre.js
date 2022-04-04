import { PREFIX } from '../../rdf'

export default (id) => `
PREFIX : <http://data-iremus.huma-num.fr/id/>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT
    ?id
    ?u10
    ?title
    ?composition_date
    ?type
    ?type_label
    ?duration_value
    ?duration_unit
    ?comment
WHERE {
    GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
        VALUES ?id { <${PREFIX}${id}> }
        ?id rdf:type lrmoo:F2_Expression .
        ?id crm:P102_has_title/crm:P190_has_symbolic_content ?title .
        OPTIONAL { ?id crm:P165_incorporates ?incorporated }
        OPTIONAL { ?id doremus:U10_has_order_number ?u10 }
        OPTIONAL { ?id doremus:U53_has_duration/crm:P90_has_value ?duration_value }
        OPTIONAL { ?id doremus:U53_has_duration/crm:P91_has_unit ?duration_unit }
        OPTIONAL {
            ?id crm:P2_has_type ?type
            OPTIONAL {
                ?type crm:P1_is_identified_by ?type_label
            }
        }
        OPTIONAL { 
            ?e13 crm:P140_assigned_attribute_to ?id .
            ?e13 crm:P177_assigned_property_type crm:P3_has_note .
            ?e13 crm:P141_assigned ?comment .
        }
        OPTIONAL {
            ?f28 lrmoo:R17_created ?id .
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
`
