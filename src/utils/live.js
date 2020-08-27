import firebase from 'firebase'

export default function liveUpdate(action) {
  switch (action.type) {
    case 'RESET':
      firebase.database().ref(`${action.uid}/live`).set(true)
      return
    case 'NUMCHARS':
      firebase.database().ref(`${action.uid}/live`).set({numChars: action.num})
      return
    case 'NAMES':
      firebase.database().ref(`${action.uid}/live/names/${action.i}`).set(action.value)
      return
    case 'ANSWERER':
      firebase.database().ref(`${action.uid}/live/answerer`).set(action.answerer)
      return
    case 'BUILDER':
      firebase.database().ref(`${action.uid}/live/builders/${action.i}/${action.property}`).set(action.value)
      return
    case 'CONNECTIVE':
      firebase.database().ref(`${action.uid}/live/connective`).set(action.connective)
      return
    case 'ROLES':
      firebase.database().ref(`${action.uid}/live/roles/${action.name}`).set(action.role)
      return
    default:
      console.log(action.type)
      alert('error updating live data')
  }
}
