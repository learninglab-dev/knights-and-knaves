import React, { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataReducer } from '../data/GameData'


export default function Create() {
  const [name, setName] = useState(null)
  const setData = useContext(DataReducer)
  const { id } = useParams()

  if (id) {
    return (
      <div>
        character creator goes here
        <button onClick={() => setData({type: 'ROLES', names: ['A', 'B', 'C', 'D']})}>click me</button>
      </div>
    )
  }
  return (
    <div>
      <p>enter a name for your game here:</p>
      <input type='text' placeholder='game id' onChange={e => setName(e.target.value)}></input>
      <p>click go! to launch then </p>
      <p>send this game name to your teammates so they can join</p>
      <Link to={`/create/${name}`}>
        <button onClick={() => setData({type: 'CREATE', id: id})}>go!</button>
      </Link>
    </div>
  )
}
