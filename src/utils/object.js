// @flow

export const mapValues = <A, B>(f: (v: A) => B) => (o: mixed): { [string]: B } =>
  ((Object.entries(o): any): Array<[string, A]>).
    map(([k, v]) => ({ [k]: f(v) })).
    reduce((z, o) => Object.assign(z, o), {})

export const stringifyValues =
  mapValues(v => JSON.stringify(v))
