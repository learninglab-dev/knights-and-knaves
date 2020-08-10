import React, { useContext, useState } from 'react'
import { Data, DataReducer } from './data/GameData'


export default function Interface() {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)
  const [mockTurn, setMockTurn] = useState('')
  console.log(gameData)

  return (
    <div>
      <h2>mock game interface. type something to take a turn</h2>
      <input value={mockTurn} onChange={e => setMockTurn(e.target.value)}></input>
      <button onClick={() => {updateGame({type: 'TURN', question: mockTurn}); setMockTurn('')}}>submit turn</button>
      <div>
        <h2>list of turns:</h2>
        {gameData.turns.map(turn => <p key={turn}>{turn}</p>)}
      </div>
    </div>
  )
}
