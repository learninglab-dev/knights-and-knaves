import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { DataReducer, Data } from '../data/GameData'


export default function Start() {
  const [id, setId] = useState(null)
  const [displayUid, setDisplayUid] = useState(false)
  const startNewGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const history = useHistory()

  const createGame = () => {
    const id = Math.random().toString(36).substr(2, 6)
    startNewGame({type: 'CREATE', uid: id})
    setDisplayUid(true)
  }

  return (
    <div>
      <h2>Knights & Knaves the Game</h2>
      {!displayUid &&
        <>
          <p>create a new game or join one in progress</p>
          <button onClick={() => createGame()}>create</button>
          <div>
            <input type='text' placeholder='game id' onChange={e => setId(e.target.value)}></input>
            <Link to={!id ? `/join` : `/join/${id}`}>
              <button>join</button>
            </Link>
          </div>
        </>
      }
      {displayUid &&
        <>
          <p>here's your game id. send it to your teammates so they can join!</p>
          <h3>{gameData.uid}</h3>
          <p>then click go! to start the game</p>
          <button onClick={() => {history.push(`/${gameData.uid}`)}}>go!</button>
        </>
      }
    </div>
  )
}
