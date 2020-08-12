import firebase from 'firebase'
import oracle from 'logic-oracle'
import chooseRoles from '../utils/chooseRoles'
import checkSolution from '../utils/checkSolution'


export default function gameDataReducer(data, action) {
  switch (action.type) {
    case 'CREATE':
      firebase.database().ref(`/`).update({[action.uid]: true})
      return {...data, uid: action.uid}
    case 'JOIN':
      return {...data, uid: action.uid, solution: action.solution, turns: action.turns}
    case 'GENERATESOLUTION':
      const roles = chooseRoles(action.names)
      firebase.database().ref(`/${data.uid}`).update({solution: roles})
      return {...data, solution: roles}
    case 'SETSOLUTION':
      return {...data, solution: action.solution}
    case 'TAKETURN':
      const nextKey = data.turns?.length || 0
      const subKeys = action.turnType === 'question' ? ['question', 'response'] : ['solution', 'correct']
      const result = action.turnType === 'question' ? oracle(action.turn) : checkSolution(action.turn, data.solution)
      firebase.database().ref(`/${data.uid}/turns/${nextKey}`).set({[subKeys[0]]: action.turn, [subKeys[1]]: result})
      if (result && subKeys[0] === 'solution') {
        firebase.database().ref(`/${data.uid}/solved`).set(true)
      }
      return data
    case 'GETTURNS':
        return {...data, turns: action.turns}
    default:
      alert('error updating game data')
  }
}

// TODO: add some error handling
