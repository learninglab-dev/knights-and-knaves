import React, { useState, useContext, useEffect } from 'react'
import { Data, DataReducer, Live, LiveReducer } from '../data/GameData'
import firebase from 'firebase'


export default function Solve() {
  const updateGame = useContext(DataReducer)
  const solution = useContext(Data).solution
  const uid = useContext(Data).uid
  const liveUpdate = useContext(LiveReducer)
  const live = useContext(Live)
  const names = Object.keys(solution)
  const [input, setInput] = useState(Object.fromEntries(names.map(name => [name, ''])))

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/roles`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : {}
    liveUpdate({type: 'SETROLES', roles: update})
    })
    return () => firebase.database().ref(`/${uid}/live/roles`).off()
  }, [liveUpdate, uid])
  useEffect(() => {
    if (live.roles) {
      setInput(live.roles)
    }
  }, [live.roles])

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
              liveUpdate({type: 'SELECTROLE', uid: uid, name: name, role: e.target.value})
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
