export default (id) => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT *
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
    VALUES ?id { <${PREFIX}${id}> }
    ?id rdf:type lrmoo:F2_Expression .

    # Série de représentations
    ?f25 crm:P165_incorporates ?f2 .
    ?f31 lrmoo:R66_included_performed_version_of ?f25 .
    ?f31 crm:P2_has_type ?f31_type .
    ?f31 crm:P2_has_type/crm:P1_is_identified_by ?f31_type_label .
    OPTIONAL { ?f31 crm:P4_has_time-span/crm:P79_beginning_is_qualified_by ?f31_begin . }
    OPTIONAL { ?f31 crm:P4_has_time-span/crm:P80_end_is_qualified_by ?f31_end . }
    OPTIONAL {
      ?f31 crm:P7_took_place_at ?f31_place .
      ?f31_place crm:P1_is_identified_by/crm:P190_has_symbolic_content ?f31_place_label .
    }

    # Dates
    ?f31 crm:P9_consists_of ?sub_f31 .
    ?sub_f31 rdf:type lrmoo:F31_Performance .
    OPTIONAL {
      ?sub_f31 crm:P2_has_type ?sub_f31_type .
      ?sub_f31 crm:P2_has_type/crm:P1_is_identified_by ?sub_f31_type_label .
    }
    OPTIONAL { ?sub_f31 crm:P4_has_time-span/crm:P82_at_some_time_within ?sub_f31_p82 . }
    OPTIONAL {
      ?sub_f31 crm:P7_took_place_at ?sub_f31_place .
      ?sub_f31_place crm:P1_is_identified_by/crm:P190_has_symbolic_content ?sub_f31_place_label .
    }
  }
}
`
