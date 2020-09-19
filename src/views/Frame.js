import React, { useContext, useEffect } from 'react'
import { Box } from 'rebass'
import firebase from 'firebase'
import { Data, DataReducer } from '../data/GameData'
import Bug from './Bug'
import Credits from './Credits'
import Oracle from './Oracle'


export default function Frame({children, status}) {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)
  const turns = gameData.turns
  const condition = !turns || Object.keys(turns).length === 0 || turns.constructor !== Object
                    ? undefined
                    : 'correct' in turns[Object.keys(turns)[Object.keys(turns).length-1]]
                    ? turns[Object.keys(turns)[Object.keys(turns).length-1]].correct.toString()
                    : undefined
  const oracleStatus = condition !== undefined ? condition : status
  console.log(gameData);

  useEffect(() => {
    if (gameData.uid) {
      firebase.database().ref(`/${gameData.uid}/turns`).on('value', snapshot => {
        const update = snapshot.val()
        updateGame({type: 'GETTURNS', turns: update})
      })
      return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
    }
  }, [updateGame, gameData.uid])
  useEffect(() => {
    if (gameData.uid) {
      firebase.database().ref(`/${gameData.uid}/solved`).on('value', snapshot => {
        if (snapshot.val()) {
          updateGame({type: 'SOLVED'})
        }
      })
      return () => firebase.database().ref(`/${gameData.uid}/solved`).off()
    }
  }, [gameData.uid, updateGame])

  return (
    <Box
      sx={{
        display:'grid',
        height:'100%',
        width:'100%',
        gridTemplateColumns: '1fr 5fr 1fr',
        gridTemplateRows: '3fr 6fr 1fr',
      }}
    >
      <Box sx={{gridColumn:'2/span 1', gridRow:'2/span 1'}}>{children}</Box>
      <Box sx={{gridColumn:'1/span 3', gridRow:'1/span 1', zIndex:'30'}}><Oracle status={oracleStatus}/></Box>
      <Box sx={{gridColumn:'1/span 1', gridRow:'3/span 1', placeSelf:'center end'}}><Credits/></Box>
      <Box sx={{gridColumn:'3/span 1', gridRow:'3/span 1', placeSelf:'center start'}}><Bug/></Box>
    </Box>
  )
}
