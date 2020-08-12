import React, { useContext, useState, useEffect, useCallback } from 'react'
import firebase from 'firebase'
import { Data, DataReducer } from './data/GameData'
import Solve from './Solve'


export default function Interface() {
  const gameData = useContext(Data)
  const updateGame = useCallback(useContext(DataReducer), [])
  const [mockTurn, setMockTurn] = useState('')
  const [checked, setChecked] = useState(false)

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
      <input type="checkbox" onChange={e => setChecked(!checked)}></input>
      <button
        onClick={() => {
          updateGame({type: 'TAKETURN', turn: mockTurn, turnType: 'solve'})
          setMockTurn('')
        }}
      >
        submit turn
      </button>
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
