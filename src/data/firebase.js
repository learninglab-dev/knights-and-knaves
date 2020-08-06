import firebase from 'firebase'
import chooseRoles from '../setup/chooseRoles'


export default function gameDataReducer(data, action) {
  switch (action.type) {
    case 'CREATE':
      const uid = firebase.database().ref(`/`).push().key
      firebase.database().ref(`${uid}`).set({id: action.id})
      return {...data, id: action.id, uid: uid}
    case 'ROLES':
      const roles = chooseRoles(action.names)
      firebase.database().ref(`/${data.uid}`).update({solution: roles})
      return {...data, solution: roles}
    case 'ASK':
    case 'SOLVE':
    default:
      alert('error updating game data')
  }
}

// TODO: add some error handling, or else force routing back to start if no uid exists for this session
