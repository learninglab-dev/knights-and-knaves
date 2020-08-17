import React, { useContext, useEffect, useCallback, useState } from 'react'
import firebase from 'firebase'
import { Data, DataReducer } from '../data/GameData'
import Solve from './Solve'
import Ask from './Ask'


export default function Interface() {
  const gameData = useContext(Data)
  const updateGame = useCallback(useContext(DataReducer), [])
  const [solved, setSolved] = useState(false)

  // TODO: add error handling
  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/turns`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'GETTURNS', turns: update})
    })
    return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
  }, [updateGame, gameData.uid])
  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/solved`).on('value', snapshot => {
      if (snapshot.val()) {
        setSolved(true)
      }
    })
    return () => firebase.database().ref(`/${gameData.uid}/solved`).off()
  }, [gameData.uid])

  return (
    <div>
      { solved && <h1>you win!!!</h1>}
      <h2>mock game interface</h2>
      <p>
        You can take two types of turns: (1) ask a question, or (2) attempt to solve. Turn submissions received by the system and responses from islanders will appear in sequence at the bottom.
      </p>
      <div style={{border: '2px solid black', paddingLeft: '10px', paddingBottom: '20px', width: '42vw'}}>
        <Ask />
      </div>
      <div style={{border: '2px solid black', paddingLeft: '10px', paddingBottom: '20px', width: '42vw', marginTop: '25px'}}>
        <Solve />
      </div>
      <div>
        <h2>turns:</h2>
        {
          Object.values(gameData.turns)?.map((turn, i) =>
          {
            const color = turn.response || turn.correct ? 'green' : 'red'
            return <p key={i} style={{color: color}}>{i+1}. {JSON.stringify(turn, null, 2)}</p>
          }
        )}
      </div>
    </div>
  )
}
