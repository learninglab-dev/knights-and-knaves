import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { DataReducer, Data } from '../data/GameData'


export default function Start() {
  const [id, setId] = useState(null)
  const [displayUid, setDisplayUid] = useState(false)
  const updateGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const history = useHistory()

  useEffect(() => {
    updateGame({type: 'RESET'})
  }, [updateGame])

  const createGame = () => {
    sessionStorage.removeItem('invalid')
    const id = Math.random().toString(36).substr(2, 6)
    updateGame({type: 'CREATE', uid: id})
    setDisplayUid(true)
  }
  const joinGame = () => {
    sessionStorage.removeItem('invalid')
    firebase.database().ref(`/${id}`).once('value').then(data => {
      return updateGame({type: 'JOIN', uid: id, solution: data.val().solution, turns: data.val().turns})
    })
  }

  return (
    <div>
      {sessionStorage.getItem('invalid') && <h3>invalid game id. please try again.</h3>}
      <h2>Knights & Knaves: A Logic Game</h2>
      {!displayUid &&
        <>
          <p>create a new game or join one in progress</p>
          <button onClick={() => createGame()} style={{marginBottom: '15px'}}>create</button>
          <div>
            <input type='text' placeholder='game id' onChange={e => setId(e.target.value)}></input>
            <Link to={!id ? `/` : `/${id}`}>
              <button onClick={() => joinGame()}>join</button>
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
      <h3 style={{marginTop: '25px'}}>about this alpha</h3>
      <p>you can play this game with a team, but it is intended to be played while your team is in contact, likely via a voice or video call</p>
      <p>each player will receive live updates but only at the end of each turn. we hope to add live updates as players type, but that isn't happening yet. thus, your team will need to either assign a scribe or coordinate who is asking a question or attempting to solve the puzzle</p>
      <p>this is particularly important on the next screen where you will number and name your islanders. only the first submission will be accepted by the game</p>
    </div>
  )
}
