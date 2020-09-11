import { predicateOptions, quantifierOptions } from './select-options'

export const englishify = (sentence, negation) => {
  const subject = sentence.names ?
    sentence.names.length > 1 ?
      sentence.names.map((name, i) => {
        if (i+1 < sentence.names.length) {
          return `${name} and `
        }
        return name
      }) :
    sentence.names :
    quantifierOptions.map(option => {
      if (option.value === sentence.quantifier) {
        return `${quantifierOptions.find(option => option.value === sentence.quantifier).label}${sentence.number ? ' ' + sentence.number : ''} of you`
      }
      return ''
    })
  const plural = () => {
    if (sentence.quantifier) {
      switch (sentence.quantifier) {
        case 'all':
        case 'some':
        case 'none':
          return true
        case 'less':
        case 'least':
          return sentence.number > 1 ? true : false
        case 'more':
        case 'most':
          return sentence.number > 1 ? true : false
        default:
          return ''
      }
    }
    return sentence.names?.length > 1 ? true : false
  }
  const predicate = plural() ?
    `are ${negation ? 'NOT ' : ''}${sentence.predicate === 'Same' || sentence.predicate === 'Different' ?
      predicateOptions.find(option => option.value === sentence.predicate).label : sentence.predicate+'s'}` :
    `is ${negation ? 'NOT ' : ''}a ${sentence.predicate}`
  return `${subject.join('')} ${predicate}`
}
