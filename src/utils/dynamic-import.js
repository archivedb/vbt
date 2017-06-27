// if not exist, return undefined
export const dynamicImportSync = (id: string): ?mixed => {
  try {
    const m = require(id)
    return m.__esModule ? m.default : m
  } catch (e) {
    return undefined
  }
}
