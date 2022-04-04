import { PREFIX } from '../../rdf'
export default (id) => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX doremus: <http://data.doremus.org/ontology#>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT *
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/peniche-opera> {
    VALUES ?f2 { <${PREFIX}${id}> }
    ?f2 rdf:type lrmoo:F2_Expression .
    ?f25 crm:P165_incorporates ?f2 .
    ?f31 lrmoo:R66_included_performed_version_of ?f25 .
    ?f31 rdf:type lrmoo:F31_Performance .
    ?f31 crm:P9_consists_of ?m42 .
    ?m42 rdf:type doremus:M42_Performed_Expression_Creation .
    ?m42 crm:P2_has_type ?m42_type .
    ?m42_type crm:P1_is_identified_by ?m42_type_label .
    ?m42 crm:P9_consists_of ?m28 .
    ?m28 rdf:type doremus:M28_Individual_Performance .
    OPTIONAL {
      ?m28 crm:P14_carried_out_by ?m28_actor .
      ?m28_actor crm:P1_is_identified_by/crm:P190_has_symbolic_content ?m28_actor_label .
    }
    OPTIONAL {
      ?m28 doremus:U1_used_medium_of_performance ?m14 .
      ?m14 crm:P1_is_identified_by ?m14_label .
    }
    OPTIONAL { ?f31 crm:P4_has_time-span/crm:P79_beginning_is_qualified_by ?f31_begin . }
    OPTIONAL { ?f31 crm:P4_has_time-span/crm:P80_end_is_qualified_by ?f31_end . }
    OPTIONAL {
      ?f31 crm:P7_took_place_at ?f31_place .
      ?f31_place crm:P1_is_identified_by/crm:P190_has_symbolic_content ?f31_place_label .
    }
  }
}
ORDER BY ?f31_p82 ?m42_type_label
`
