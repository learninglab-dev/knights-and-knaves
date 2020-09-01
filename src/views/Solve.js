import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Data, DataReducer } from '../data/GameData'
import liveUpdate from '../utils/live'
import firebase from 'firebase'


export default function Solve() {
  const updateGame = useContext(DataReducer)
  const solution = useContext(Data).solution
  const uid = useContext(Data).uid
  const names = useMemo(() => Object.keys(solution), [solution])
  const [input, setInput] = useState(Object.fromEntries(names.map(name => [name, ''])))
  console.log(JSON.stringify(input))

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/roles`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : Object.fromEntries(names.map(name => [name, '']))
    setInput(update)
    })
    return () => firebase.database().ref(`/${uid}/live/roles`).off()
  }, [uid, names])

  return (
    <>
    <h3>attempt to Solve</h3>
    {
      names.map((name, i) =>
        <div key={i}>
          <label>{name} </label>
          <select
            value={input[name]}
            onChange={e => {
              setInput({...input, [name]: e.target.value})
              liveUpdate({type: 'ROLES', uid: uid, name: name, role: e.target.value})
            }}
            >
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
        console.log(JSON.stringify(input))
        updateGame({type: 'TAKETURN', turn: input, turnType: 'solve'})
        liveUpdate({type: 'RESET', uid: uid})
        setInput(Object.fromEntries(names.map(name => [name, ''])))
      }}
      style={{marginTop: '15px'}}
      >
      attempt to solve
    </button>
    </>
  )
}
