import firebase from 'firebase'

export default function liveUpdatesReducer(state, action) {
  switch (action.type) {
    case 'NUMCHARS':
      firebase.database().ref(`${action.uid}/live`).set({numChars: action.num})
      return {...state, numChars: action.num}
    case 'SETNUMCHARS':
      return {...state, numChars: action.num}
    case 'NAMES':
      firebase.database().ref(`${action.uid}/live/names/${action.i}`).set(action.value)
      return {...state, names: {...state.names, [action.i]: action.value}}
    case 'SETNAMES':
      return {...state, names: action.names}
    case 'SELECTROLE':
      firebase.database().ref(`${action.uid}/live/roles/${action.name}`).set(action.role)
      return {...state, roles: {...state.roles, [action.name]: action.role}}
    case 'SETROLES':
      return {...state, roles: action.roles}
    default:
      alert('error updating live data')
  }
}
