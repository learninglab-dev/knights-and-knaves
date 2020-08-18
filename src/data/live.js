import firebase from 'firebase'

export default function liveUpdatesReducer(state, action) {
  switch (action.type) {
    case 'NUMCHARS':
      console.log(action);
      firebase.database().ref(`${action.uid}/live`).set({numChars: action.num})
      return {...state, numChars: action.num}
    case 'SETNUMCHARS':
      return {...state, numChars: action.num}
    default:
      alert('error updating live data')
  }
}
