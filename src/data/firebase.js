import firebase from 'firebase'
import oracle from 'logic-oracle'
import chooseRoles from '../utils/chooseRoles'
import checkSolution from '../utils/checkSolution'


export default function gameDataReducer(data, action) {
  switch (action.type) {
    case 'RESET':
      return {
        uid: '',
        solution: null,
        turns: [],
        startTime: '',
      }
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
      if (action.turnType === 'question') {
        const questions = {...action.turn}
        console.log(JSON.stringify(questions, null, 2));
        const result = oracle(data.solution, action.answerer, action.turn)
        firebase.database().ref(`/${data.uid}/turns`).push().set({answerer: action.answerer, question: questions, response: result})
        return data
      }
      const result = checkSolution(action.turn, data.solution)
      firebase.database().ref(`/${data.uid}/turns`).push().set({solution: action.turn, correct: result})
      if (result) {
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
