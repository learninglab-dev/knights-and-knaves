import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Start() {
  const [id, setId] = useState(null)
  return (
    <div>
      <h2>Knights & Knaves the Game</h2>
      <p>create a new game or join one in progress</p>
      <Link to='/create'>
        <button>create</button>
      </Link>
      <div>
        <input type='text' placeholder='game id' onChange={e => setId(e.target.value)}></input>
        <Link to={!id ? `/join` : `/join/${id}`}>
          <button>join</button>
        </Link>
      </div>
    </div>
  )
}
