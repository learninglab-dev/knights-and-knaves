import React, { useContext, useState, useEffect, useCallback } from 'react'
import firebase from 'firebase'
import { Data, DataReducer } from './data/GameData'


export default function Interface() {
  const gameData = useContext(Data)
  const updateGame = useCallback(useContext(DataReducer), [])
  const [mockTurn, setMockTurn] = useState('')

  // TODO: add error handling
  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/turns`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'GETTURNS', turns: update})
    })
    return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
  }, [updateGame, gameData.uid])

  return (
    <div>
      <h2>mock game interface. type something to take a turn</h2>
      <input value={mockTurn} onChange={e => setMockTurn(e.target.value)}></input>
      <button onClick={() => {updateGame({type: 'TAKETURN', question: mockTurn})}}>submit turn</button>
      <div>
        <h2>list of turns:</h2>
        {gameData.turns?.map((turn, i) => <p key={i}>{turn}</p>)}
      </div>
    </div>
  )
}
