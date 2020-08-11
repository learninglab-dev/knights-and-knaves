import React, { useState, useContext, useEffect, useCallback } from 'react'
import firebase from 'firebase'
import { DataReducer, Data } from './data/GameData'


export default function CharacterBuilder() {
  const updateGame = useCallback(useContext(DataReducer), [])
  const gameData = useContext(Data)
  const [num, setNum] = useState(null)
  const [names, setNames] = useState({})

  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/solution`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'SETSOLUTION', solution: update})
    })
    return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
  }, [])

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <div key={i}>
        name:
        <input type='text' onChange={e => setNames({...names, [i]: e.target.value})}></input>
      </div>
    )
  }
  if (!num) {
    return (
      <div>
        <p>how many islanders will you meet today?</p>
        <input type='text' onChange={e => setNum(e.target.value)}></input>
      </div>
    )
  }
  return (
    <div>
      <div>
        <p>how many islanders will you meet today?</p>
        <input type='text' onChange={e => setNum(e.target.value)} value={num}></input>
      </div>
      <p>let's name your islanders</p>
      {characters}
      <button onClick={() => updateGame({type: 'GENERATESOLUTION', names: names})}>start the game</button>
    </div>
  )
}
