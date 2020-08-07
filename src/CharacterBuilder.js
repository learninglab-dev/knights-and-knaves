import React, { useState, useContext } from 'react'
import { DataReducer } from './data/GameData'


export default function CharacterBuilder() {
  const setCharacters = useContext(DataReducer)
  const [num, setNum] = useState(null)
  const [names, setNames] = useState({})
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
      <button onClick={() => setCharacters({type: 'ROLES', names: names})}>start the game</button>
    </div>
  )
}
