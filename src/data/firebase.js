import firebase from 'firebase'
import chooseRoles from '../chooseRoles'


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
      firebase.database().ref(`/${data.uid}/turns/${nextKey}`).set(action.question)
      return data
    case 'GETTURNS':
        return {...data, turns: action.turns}
    default:
      alert('error updating game data')
  }
}

// TODO: add some error handling, or else force routing back to start if no uid exists for this session
