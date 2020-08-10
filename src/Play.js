import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase'
import { Data, DataReducer } from './data/GameData'
import CharacterBuilder from './CharacterBuilder'
import Interface from './Interface'

// QUESTION: if this is it, does this really need to be a component?
export default function Play() {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)
  console.log(gameData)

  if (gameData.solution) {
    return <Interface />
  }
  return <CharacterBuilder />
}
