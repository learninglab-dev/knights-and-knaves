import firebase from 'firebase'

export default function liveUpdate(action) {
  switch (action.type) {
    case 'RESET':
      firebase.database().ref(`${action.uid}/live/builders`)
        .set('CLEAR', err => {
          if (err) {
            console.log(err)
            return
          }
        })
        firebase.database().ref(`${action.uid}/live/roles`)
          .set(true, err => {
            if (err) {
              console.log(err)
              return
            }
          })
        firebase.database().ref(`${action.uid}/live/answerer`)
          .set(true, err => {
            if (err) {
              console.log(err)
              return
            }
          })
        firebase.database().ref(`${action.uid}/live/connective`)
          .set('CLEAR', err => {
            if (err) {
              console.log(err)
              return
            }
          })
      return
    case 'CLEAR_ANSWERER':
      firebase.database().ref(`${action.uid}/live/answerer`)
        .set(true, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'CLEAR_BUILDERS':
      firebase.database().ref(`${action.uid}/live/builders`)
        .set('CLEAR', err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'CLEAR_ROLES':
      firebase.database().ref(`${action.uid}/live/roles`)
        .set(true, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'CLEAR_CONNECTIVE':
      firebase.database().ref(`${action.uid}/live/connective`)
        .set('CLEAR', err => {
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
      firebase.database().ref(`${action.uid}/live/builders/${action.answerer}/${action.i}/${action.property}`)
        .set(action.value, err => {
          if (err) {
            console.log(err)
            return
          }
        })
      return
    case 'CONNECTIVE':
      firebase.database().ref(`${action.uid}/live/connective/${action.answerer}`)
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
      alert('error updating live data')
  }
}
