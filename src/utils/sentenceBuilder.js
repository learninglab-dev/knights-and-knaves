export default function sentenceBuilder(sentence, action) {
  switch(action.type){
    case 'RESET':
      return {
        disableNames: false,
        disableQuantifier: false,
        disableNumber: true,
        names: null,
        quantifier: null,
        number: null,
        predicate: null,
        connective: null,
      }
    case 'ORACLESPEAK':
      return {...sentence, oracleSpeak: [sentence.predicate, sentence.names? sentence.names : sentence.number ? [sentence.quantifier, sentence.number] : [sentence.quantifier]]}
    case 'names':
      const result = action.value ? action.value.map(x => x.value) : []
      return {
        ...sentence,
        names: result,
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
          }
        }
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