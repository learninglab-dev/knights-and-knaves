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
    case 'BUILDER':
      console.log(JSON.stringify(action, null, 2));
      console.log(action.value);
      firebase.database().ref(`${action.uid}/live/builders/${action.i}/${action.property}`).set(action.value)
      return state
    case 'SETBUILDER':
      return {...state, builders: action.builders}
    case 'CHECKNOT':
      return {...state, builders: {...state.builders, [action.i]: true}}
    case 'SELECTCONNECTIVE':
      firebase.database().ref(`${action.uid}/live/connective`).set(action.connective)
      return state
    case 'SETCONNECTIVE':
      return {...state, connective: action.connective}
    case 'SELECTROLE':
      firebase.database().ref(`${action.uid}/live/roles/${action.name}`).set(action.role)
      return {...state, roles: {...state.roles, [action.name]: action.role}}
    case 'SETROLES':
      return {...state, roles: action.roles}
    default:
      console.log(action.type);
      alert('error updating live data')
  }
}
