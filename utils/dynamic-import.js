// if file not exist, return undefined
export const dynamicImportSync = (file: string) => {
  try {
    const oct = require(file)
    const ct = oct.__esModule ? oct.default : oct
    return ct
  } catch (err) {
    return undefined
  }
}
