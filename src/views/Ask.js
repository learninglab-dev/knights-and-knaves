import React, { useState, useContext } from 'react'
import { DataReducer } from '../data/GameData'


export default function Ask() {
  const updateGame = useContext(DataReducer)
  const [mockTurn, setMockTurn] = useState('')

  return (
    <>
      <h2>mock game interface. type something to take a turn</h2>
      <input value={mockTurn} onChange={e => setMockTurn(e.target.value)}></input>
      <button
        onClick={() => {
          updateGame({type: 'TAKETURN', turn: mockTurn, turnType: 'solve'})
          setMockTurn('')
        }}
      >
        submit turn
      </button>
    </>
  )
}
