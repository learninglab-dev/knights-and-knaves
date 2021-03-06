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
      firebase.database().ref(`/`)
        .update({[action.uid]: true}, err => {
          if (err) {
            alert('We had an issue connecting to the database. Sorry about that! Please try again.')
            return data
          }
        })
      return {...data, uid: action.uid, creator: true}
    case 'JOIN':
      return {...data, uid: action.uid, solution: action.solution, turns: action.turns}
    case 'GENERATESOLUTION':
      if (action.names.length !== Number(action.num)) {
        alert('Looks like you forgot to name one of your characters!')
        return data
      }
      const namesSet = new Set(Object.values(action.names))
      if (namesSet.size !== Object.values(action.names).length) {
        alert('All your characters need unique names or the oracle gets confused...')
        return data
      }
      const roles = chooseRoles(action.names)
      firebase.database().ref(`/${data.uid}`)
        .update({solution: roles}, err => {
          if (err) {
            alert('We had an issue connecting to the database. Sorry about that! Please try again.')
            return data
          }
        })
      return {...data, solution: roles}
    case 'SETSOLUTION':
      return {...data, solution: action.solution}
    case 'TAKETURN':
      if (action.turnType === 'question') {
        if (action.turn === 'invalid') {
          alert('Your question is not valid. Check your inputs and try again.')
          return data
        }
        if (!action.answerer) {
          alert('Looks like you forgot to choose a character to ask...')
          return data
        }
        const result = oracle(data.solution, action.answerer, action.turn)
        firebase.database().ref(`/${data.uid}/turns`)
          .push()
          .set({answerer: action.answerer, question: action.copy, english: action.english, response: result}, err => {
            if (err) {
              alert('We had an issue connecting to the database. Sorry about that! Please try again.')
              return data
            }
          })
        return data
      }
      const nonEmpty = () => {
        const names = Object.keys(data.solution)
        const inputs = Object.keys(action.turn)
        if (!(names.length === inputs.length)) {
          return false
        }
        return true
      }
      if (!nonEmpty()) {
        alert('Looks like you forgot to enter a role for one of your characters! Try again.')
        return data
      }
      const result = checkSolution(action.turn, data.solution)
      firebase.database().ref(`/${data.uid}/turns`)
        .push()
        .set({solution: action.turn, correct: result, english: action.english}, err => {
          if (err) {
            alert('We had an issue connecting to the database. Sorry about that! Please try again.')
            return data
          }
        })
      if (result) {
        firebase.database().ref(`/${data.uid}/solved`).set(true, err => {
          if (err) {
            alert('We had an issue connecting to the database. Sorry about that! Please try again.')
            return data
          }
        })
      }
      return data
    case 'GETTURNS':
        return {...data, turns: action.turns}
    case 'SOLVED':
      return {...data, solved: true}
    default:
      alert('Error updating game data')
  }
}
