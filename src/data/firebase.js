import firebase from 'firebase'
import chooseRoles from '../chooseRoles'


export default function gameDataReducer(data, action) {
  switch (action.type) {
    case 'CREATE':
      firebase.database().ref(`/`).update({[action.uid]: true})
      return {...data, uid: action.uid}
    case 'CREATEREAD':
      return {...data, uid: action.uid}
    case 'ROLES':
      const roles = chooseRoles(action.names)
      firebase.database().ref(`/${data.uid}`).update({solution: roles})
      return {...data, solution: roles}
    case 'ROLESREAD':
      return {...data, solution: action.solution}
    case 'TURN':
      const nextKey = data.turns.length
      firebase.database().ref(`/${data.uid}/turns/${nextKey}`).set(action.question)
      return {...data, turns: {...data.turns, nextKey: action.question}}
    case 'TURNREAD':
      return {...data, turns: [...data.turns, action.turn]}
    default:
      alert('error updating game data')
  }
}

// TODO: add some error handling, or else force routing back to start if no uid exists for this session
