export default function sentenceBuilder(sentence, action) {
  switch(action.type){
    case 'RESET':
      return {
        1: '',
        2: '',
        c: ''
      }
    case 'ORACLESPEAK':
      return {...sentence, oracleSpeak: [sentence.predicate, sentence.names? sentence.names : sentence.number ? [sentence.quantifier, sentence.number] : [sentence.quantifier]]}
    case 'names':
      const result = action.value ? action.value.map(x => x.value) : []
      if (result.length === 0) {
        return {
          ...sentence,
          names: result,
          disableNames: false,
          disableNumber: true,
          disableQuantifier: false,
        }
      }
      return {
        ...sentence,
        names: result,
        disableNames: false,
        disableNumber: true,
        disableQuantifier: true,
      }
    case 'quantifier':
      switch(action.value){
        case null:
          return {
            ...sentence,
            disableNames: false,
            disableNumber: true,
            quantifier: action.value,
            number: null,
          }
        case 'least':
        case 'most':
        case 'less':
        case 'more':
          return {
            ...sentence,
            disableNames: true,
            disableNumber: false,
            quantifier: action.value,
            names: null
          }
        case 'all':
        case 'some':
        case 'none':
          return {
            ...sentence,
            disableNames: true,
            disableNumber: true,
            quantifier: action.value,
            number: null,
            names: null
          }
          default: alert('error in minibuilder. help!')
        }
        return
    case 'number':
      return {
        ...sentence,
        number: action.value,
      }
    case 'predicate':
      return {
        ...sentence,
        predicate: action.value,
      }
    case 'connective':
      return {
        ...sentence,
        connective: action.value,
      }
    default:
      alert('error in minibuilder. help!')
  }
}
