import firebase from 'firebase'
import chooseRoles from '../chooseRoles'


export default function gameDataReducer(data, action) {
  switch (action.type) {
    case 'CREATE':
      firebase.database().ref(`/`).update({[action.uid]: true})
      firebase.database().ref(`/${action.uid}`).on('value', snapshot => {
      const update = snapshot.val()
      if (!data.solution) {
        const solution = update.solution ? update.solution : []
        return {...data, solution: solution}
      } else {
        const turns = update.turns ? update.turns : []
        return {...data, turns: turns}
      }
      })
      return {...data, uid: action.uid}
    case 'JOIN':
      return {...data, uid: action.uid, solution: action.solution, turns: action.turns}
    case 'ROLES':
      const roles = chooseRoles(action.names)
      firebase.database().ref(`/${data.uid}`).update({solution: roles})
      return {...data, solution: roles}
    case 'ROLESREAD':
      console.log('rolesread');
      console.log(action.turns);
      console.log(data);
      return {...data, turns: action.turns}
    case 'TURN':
      const nextKey = data.turns.length
      firebase.database().ref(`/${data.uid}/turns/${nextKey}`).set(action.question)
      return data
    default:
      alert('error updating game data')
  }
}

// TODO: add some error handling, or else force routing back to start if no uid exists for this session
