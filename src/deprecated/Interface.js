import React, { useContext, useEffect, useCallback, useState } from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import { Data, DataReducer } from '../data/GameData'
import Lineup from './Lineup'
import Popover, {ArrowContainer} from 'react-tiny-popover'


export default function Interface() {
  const gameData = useContext(Data)
  const updateGame = useCallback(useContext(DataReducer), [])
  const [solved, setSolved] = useState(false)
  console.log(gameData);


  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/turns`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'GETTURNS', turns: update})
    })
    return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
  }, [updateGame, gameData.uid])
  useEffect(() => {
    firebase.database().ref(`/${gameData.uid}/solved`).on('value', snapshot => {
      if (snapshot.val()) {
        setSolved(true)
      }
    })
    return () => firebase.database().ref(`/${gameData.uid}/solved`).off()
  }, [gameData.uid])

  return (
    <Flex
      sx={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        pt:'10vh',
        width:'100%',
        height:'100%',
      }}>
      { solved && <h1>you win!!!</h1>}
      <Lineup solved={solved}/>
      <Flex
        sx={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          width:'100%'
        }}>
      </Flex>
    </Flex>
  )
}
