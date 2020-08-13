import React, { useState, useContext } from 'react'
import { Data } from '../data/GameData'
import MiniBuilder from './MiniBuilder'


export default function Ask() {
  const gameData = useContext(Data)
  const names = Object.keys(gameData.solution)
  const [answerer, setAnswerer] = useState('')

  return (
    <>
      <h2>mock game interface. type something to take a turn</h2>
      <div style={{marginTop: '25px', marginBottom: '25px'}}>
        <label>who are you asking?</label>
        <select onChange={e => setAnswerer(e.target.value)}>
          <option value='' key={'empty'}>select a character...</option>
          {names.map(name => <option value={name} key={name}>{name}</option>)}
        </select>
      </div>
      <MiniBuilder names={names} answerer={answerer}/>
    </>
  )
}