import firebase from 'firebase'

export default function liveUpdate(action) {
  switch (action.type) {
    case 'RESET':
      firebase.database().ref(`${action.uid}/live/builders`)
        .set(true, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'NUMCHARS':
      firebase.database().ref(`${action.uid}/live`)
        .set({numChars: action.num}, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'NAMES':
      firebase.database().ref(`${action.uid}/live/names/${action.i}`)
      .set(action.value, err => {
        if (err) {
          console.log(err)
          return
        }
      })
      return
    case 'ANSWERER':
      firebase.database().ref(`${action.uid}/live/answerer`)
        .set(action.answerer, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'BUILDER':
      firebase.database().ref(`${action.uid}/live/builders/${action.i}/${action.property}`)
        .set(action.value, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'CONNECTIVE':
      firebase.database().ref(`${action.uid}/live/connective`)
        .set(action.connective, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'ROLES':
      firebase.database().ref(`${action.uid}/live/roles/${action.name}`)
        .set(action.role, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    default:
      console.log(action.type)
      alert('error updating live data')
  }
}
