import React, { useState, useContext, useEffect } from 'react'
import { Data, DataReducer } from './data/GameData'

export default function Play() {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)

  if (gameData.solution) {
    console.log('here')
    return //question asking functions
  }
  return <div>character builder here</div>
}
