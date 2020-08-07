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

  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}`).on('value', snapshot => {
    const update = snapshot.val()
    if (!gameData.solution) {
      const solution = update.solution ? update.solution : null
      updateGame({type: 'ROLESREAD', solution: solution})
    } else {
      const turn = update.turns[update.turns.length-1]
      updateGame({type: 'TURNREAD', turn: turn})
    }
    })
    return () => firebase.database().ref(`/${gameData.uid}`).off()
  }, [])

  if (gameData.solution) {
    return <Interface />
  }
  return <CharacterBuilder />
}
