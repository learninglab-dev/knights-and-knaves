import React, { useState, useContext } from 'react'
import { Data, DataReducer } from '../data/GameData'
import MiniBuilder from './MiniBuilder'


export default function Ask() {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)
  const names = Object.keys(gameData.solution)
  const [answerer, setAnswerer] = useState('')
  const [compoundSentence, setCompound] = useState({1: '', 2: '', c: ''})
  const connectives = ['AND', 'OR', 'IF', 'IFF']

  const setConjunct = (sentence, i) => {
    setCompound({...compoundSentence, [i]: sentence})
    return
  }

  return (
    <>
      <div style={{marginTop: '25px', marginBottom: '25px'}}>
        <h3>ask a Question</h3>
        <label>who are you asking? </label>
        <select onChange={e => setAnswerer(e.target.value)}>
          <option value='' key={'empty'}>select a character...</option>
          {names.map(name => <option value={name} key={name}>{name}</option>)}
        </select>
      </div>
      <MiniBuilder key={1} i={1} names={names} answerer={answerer} setConjunct={setConjunct}/>
      <select
        value={compoundSentence.c}
        onChange={e => setCompound({...compoundSentence, c: e.target.value})}
        >
        <option value='' key={'empty'}>add a connective?</option>
        {connectives.map(connective => <option value={connective} key={connective}>{connective}</option>)}
      </select>
      {compoundSentence.c && <MiniBuilder key={2} i={2} names={names} answerer={answerer}setConjunct={setConjunct}/> }
      <button
        onClick={() => {
          updateGame({
            type: 'TAKETURN',
            turn: compoundSentence.c ? compoundSentence : compoundSentence[1],
            turnType: 'question',
            answerer: answerer
          })
          setCompound({1: '', 2: '', c: ''})
        }}
      >
        ask!
      </button>
    </>
  )
}
