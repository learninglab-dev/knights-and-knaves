import React, {
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import firebase from 'firebase'
import {
  DataReducer,
  Data,
} from '../data/GameData'
import liveUpdate from '../utils/live'


export default function CharacterBuilder() {
  const updateGame = useCallback(useContext(DataReducer), [])
  const uid = useContext(Data).uid
  const [num, setNum] = useState('')
  const [names, setNames] = useState({})

  // TODO: add error handling
  useEffect(() => {
    firebase.database().ref(`/${uid}/solution`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'SETSOLUTION', solution: update})
    })
    return () => firebase.database().ref(`/${uid}/solution`).off()
  }, [updateGame, uid])
  useEffect(() => {
    firebase.database().ref(`/${uid}/live/numChars`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setNum(update)
    })
    firebase.database().ref(`/${uid}/live/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : {}
    setNames(update)
    })
    return () => {
      firebase.database().ref(`/${uid}/live/numChars`).off()
      firebase.database().ref(`/${uid}/live/names`).off()
    }
  }, [uid])

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <div key={i}>
        <label>name: </label>
        <input
          type='text'
          value={names[i] || ''}
          onChange={e => {
            setNames({...names, [i]: e.target.value})
            liveUpdate({type: 'NAMES', uid: uid, i: i, value: e.target.value})
          }}
        ></input>
      </div>
    )
  }

  return (
    <>
    <div style={{marginLeft: '20px'}}>
      <p style={{paddingTop: '20px'}}>how many islanders will you meet today?</p>
      <input
        key='numChars'
        type='text'
        value={num}
        onChange={e => {
          setNum(e.target.value)
          liveUpdate({type: 'NUMCHARS', uid: uid, num: e.target.value})
        }}
        ></input>
      {num &&
        <>
          <p>let's name your islanders</p>
          {characters}
          <button style={{marginTop: '20px'}} onClick={() => updateGame({type: 'GENERATESOLUTION', names: names})}>start the game</button>
        </>
      }
    </div>
    </>
  )
}
