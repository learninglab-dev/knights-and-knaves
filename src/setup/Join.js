import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Game from '../gameplay/Game'


export default function Join() {
  const { id } = useParams()
  if (id) {
    return (
      <div>
        character creator viewer goes here
      </div>
    )
  }
  return (
    <div>
      please enter a game name to join the game!
    </div>
  )
}
