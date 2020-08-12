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
      <div>
        <Ask />
      </div>
      <div>
        <Solve />
      </div>
      <div>
        <h2>list of turns:</h2>
        {gameData.turns?.map((turn, i) => <p key={i}>{JSON.stringify(turn, null, 2)}</p>)}
      </div>
    </div>
  )
}
