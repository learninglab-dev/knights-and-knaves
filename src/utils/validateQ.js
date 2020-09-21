export const validateQ = (builder) => {
  if (!builder.predicate) {
    return false
  }
  if (!builder.names && !builder.quantifier) {
    return false
  }
  if (builder.quantifier === 'Same' || builder.quantifier === 'Different') {
    if (builder.num <= 1 && builder.names.length <= 1) {
        return false
    }
  }
  if (builder.quantifier === 'most' || builder.quantifier === 'least' || builder.quantifier === 'more' || builder.quantifier === 'less') {
    if (!builder.number) {
      return false
    }
  }
  return true
}
