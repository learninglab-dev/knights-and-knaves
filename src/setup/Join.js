import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Game from '../gameplay/Game'


export default function Join() {
  const { id } = useParams()
  return (
    <div>
    {id !== 'null' ?
      <Game id={id} />
      : <div>sorry, we couldn't find a game with that name</div>
    }
    </div>
  )
}
