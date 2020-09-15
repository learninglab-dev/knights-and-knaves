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
        return `${negation && (sentence.quantifier !== 'most' && sentence.quantifier !== 'least') ? 'NOT ' : ''}${quantifierOptions.find(option => option.value === sentence.quantifier).label}${sentence.number ? ' ' + sentence.number : ''} of you`
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
    `are ${negation && (!sentence.quantifier || sentence.quantifier === 'most' || sentence.quantifier === 'least')? 'NOT ' : ''}${sentence.predicate === 'Same' || sentence.predicate === 'Different' ?
      predicateOptions.find(option => option.value === sentence.predicate).label : sentence.predicate+'s'}` :
    `is ${negation ? 'NOT ' : ''}a ${sentence.predicate}`
  return `${subject.join('')} ${predicate}`
}

export const completeEnglish = (mb1, mb2, connective, nots) => {
  return connective ? (connective === 'IF'? 'IF ' : '') + englishify(mb1, nots[1]) + (connective === 'IF'? ',' : ' ' + connective) + ' ' + englishify(mb2, nots[2]) : englishify(mb1, nots[1])
}

export const englishifySolve = (input) => {
  const names = Object.keys(input)
  const roles = {
    K: 'Knight',
    N: 'Knave',
    D: 'Dragon',
    M: 'Monk'
  }
  const addIsA = names.map(name => `${name} is a ${roles[input[name]]}; `)
  return `${addIsA.join('').slice(0, -2)}.`
}
