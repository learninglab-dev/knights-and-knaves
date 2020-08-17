import React, {
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import firebase from 'firebase'
import { DataReducer, Data } from '../data/GameData'


export default function CharacterBuilder() {
  const updateGame = useCallback(useContext(DataReducer), [])
  const uid = useContext(Data).uid
  const [num, setNum] = useState(null)
  const [names, setNames] = useState({})

  // TODO: add error handling
  useEffect(() => {
    firebase.database().ref(`/${uid}/solution`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'SETSOLUTION', solution: update})
    })
    return () => firebase.database().ref(`/${uid}/solution`).off()
  }, [updateGame, uid])

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <div key={i}>
        <label>name: </label>
        <input type='text' onChange={e => setNames({...names, [i]: e.target.value})}></input>
      </div>
    )
  }
  if (!num) {
    return (
      <div style={{marginLeft: '20px'}}>
        <p style={{paddingTop: '20px'}}>how many islanders will you meet today?</p>
        <input type='text' onChange={e => setNum(e.target.value)}></input>
      </div>
    )
  }
  return (
    <div style={{marginLeft: '20px'}}>
      <div>
        <p style={{paddingTop: '20px'}}>how many islanders will you meet today?</p>
        <input type='text' onChange={e => setNum(e.target.value)} value={num}></input>
      </div>
      <p>let's name your islanders</p>
      {characters}
      <button style={{marginTop: '20px'}} onClick={() => updateGame({type: 'GENERATESOLUTION', names: names})}>start the game</button>
    </div>
  )
}
