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
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
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
      </div>
      <h3 style={{marginTop: '25px'}}>about this alpha</h3>
      <p>
        For those unfamiliar, <a href="https://en.wikipedia.org/wiki/Knights_and_Knaves" target="_blank" rel="noopener noreferrer">Knights & Knaves</a> is a type of logic puzzle in which you, the puzzle solver find yourself on an island with four types of inhabitants: Knights, Knaves, Dragons, and Monks. You encounter a group of islanders passing by and must determine their identities from only what they say. Knights always speak the truth; Knaves always lie; Dragons speak the truth unless a Knight is present, in which case they only lie; and Monks say whatever they please. In this game version of Knights & Knaves, you can specify how many islanders you encounter, with number of islanders serving as a rough proxy of difficulty.
      </p>
      <p>
        Unlike in some versions of the puzzles, these islanders are silent until you ask them yes-no questions. For now, you can only ask questions that contain one predicate. Connectives are coming soon. Also for now, you can choose freely which islander to direct your questions to. Your goal is to solve the puzzle, i.e. determine your characters' identities, by asking as few questions as possible. So choose carefully!
      </p>
      <p>
        We also imagine other versions of the game in which certain mechanics force your hand, e.g. a limit on the number of questions you can ask each character, or only a random subset of the predicates are available to you each turn. For anyone playtesting, we'd love your feedback on these sorts of modes and how to strike a balance between a pure test of logic skills and continuous challenge and replayability.
      </p>
      <p>
        This game is designed to be played as a team (although you can certainly play alone), and it is intended to be played while your team is in contact, likely via a voice or video call. Each player will receive live updates as other players type or input questions, but you can overwrite each other if you're not careful. Thus, your team will need to either assign a scribe or coordinate who is taking each turn. This is particularly important on the next screen where you will number and name your islanders. Only the first submission will be accepted by the game. As soon as the first teammate hits submit, your whole team will be redirected to the game interface.</p>
      <p>Have fun!</p>
    </div>
  )
}
