import React, { useState, useContext } from 'react'
import { Data, DataReducer } from '../data/GameData'


export default function Solve() {
  const updateGame = useContext(DataReducer)
  const solution = useContext(Data).solution
  const names = Object.keys(solution)
  const [input, setInput] = useState(Object.fromEntries(names.map(name => [name, ''])))
  console.log(input)

  return (
    <>
    <h3>attempt to Solve</h3>
    {
      names.map((name, i) =>
        <div key={i}>
          <label>{name} </label>
          <select value={input[name]} onChange={e => setInput({...input, [name]: e.target.value})}>
            <option value="" defaultValue>Select a role...</option>
            <option value="K">Knight</option>
            <option value="N">Knave</option>
            <option value="D">Dragon</option>
            <option value="M">Monk</option>
          </select>
        </div>
      )
    }
    <button
      onClick={() => {
        updateGame({type: 'TAKETURN', turn: input, turnType: 'solve'})
        setInput(Object.fromEntries(names.map(name => [name, ''])))
      }}
      style={{marginTop: '15px'}}
      >
      attempt to solve
    </button>
    </>
  )
}
