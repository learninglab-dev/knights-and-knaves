export const validateQ = (builder) => {
  if (!builder.predicate) {
    console.log('predicate')
    return false
  }
  if (!builder.names && !builder.quantifier) {
    console.log('names')
    return false
  }
  if (builder.quantifier === 'Same' || builder.quantifier === 'Different') {
    if (builder.num <= 1 && builder.names.length <= 1) {
        console.log('same/diff')
        return false
    }
  }
  if (builder.quantifier === 'most' || builder.quantifier === 'least' || builder.quantifier === 'more' || builder.quantifier === 'less') {
    if (!builder.number) {
      console.log('num')
      return false
    }
  }
  return true
}
