// @flow

export const mapObjectValues = (f: (v: any) => any) => (o: Object) =>
  Object.entries(o).
    map(([k, v]) => ({ [k]: f(v) })).
    reduce((z, o) => Object.assign(z, o), {})

export const stringifyObjectValues =
  mapObjectValues(v => JSON.stringify(v))
