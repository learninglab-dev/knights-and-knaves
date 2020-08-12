import React, { useState, useContext } from 'react'
import { DataReducer, Data } from '../data/GameData'
import MiniBuilder from './MiniBuilder'


export default function Ask() {
  const gameData = useContext(Data)
  const names = Object.keys(gameData.solution)

  return (
    <>
      <h2>mock game interface. type something to take a turn</h2>
      {/*<input value={mockTurn} onChange={e => setMockTurn(e.target.value)}></input>*/}
      <MiniBuilder names={names}/>
    </>
  )
}
