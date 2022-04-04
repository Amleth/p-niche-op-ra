export const PREFIX = 'http://data-iremus.huma-num.fr/id/'

export const values = (bindings) =>
  bindings.map((w) => {
    const o = {}
    for (const k in w) {
      if (w[k].datatype === 'http://www.w3.org/2001/XMLSchema#integer')
        o[k] = parseInt(w[k].value)
      else o[k] = w[k].value
    }
    return o
  })
