import React, { useContext, useEffect, useCallback, useState } from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import { Data, DataReducer } from '../data/GameData'
import Solve from './Solve'
import Hints from './Hints'
import History from './History'
import Lineup from './Lineup'
import Popover, {ArrowContainer} from 'react-tiny-popover'



export default function Interface() {
  const [isHint, setIsHint] = useState(null)
  const [isSolve, setIsSolve] = useState(null)
  const [isHistory, setIsHistory] = useState(null)
  const gameData = useContext(Data)
  const updateGame = useCallback(useContext(DataReducer), [])
  const [solved, setSolved] = useState(false)

  // TODO: add error handling
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
        width:'60%',
        height:'100%',
      }}>
      { solved && <h1>you win!!!</h1>}
      <Lineup />
      <Flex
        sx={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          width:'100%'
        }}>
        <Popover
          isOpen={isHint}
          padding={5}
          onClickOutside={e => setIsHint(!isHint)}
          transitionDuration={0.25}
          containerStyle={{width:'25%'}}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={'#54345B'}
              arrowSize={10}
              style={{backgroundColor:'#54345B'}}
            >
            <Hints />
            </ArrowContainer>
          )}
        >
          <Button variant='outline' onClick={() => setIsHint(!isHint)} sx={{m:10}}>
            <Heading sx={{fontSize:'medium'}}>?</Heading>
          </Button>
        </Popover>
        <Popover
          isOpen={isSolve}
          padding={5}
          onClickOutside={e => setIsSolve(!isSolve)}
          transitionDuration={0.25}
          containerStyle={{width:'50%'}}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={'#54345B'}
              arrowSize={10}
              style={{backgroundColor:'#54345B'}}
            >
              <Solve />
            </ArrowContainer>
          )}
        >
          <Button variant='tertiary' onClick={() => setIsSolve(!isSolve)} sx={{m:10}}>
            <Heading sx={{fontSize:'medium'}}>solve!</Heading>
          </Button>
        </Popover>
        <Popover
          isOpen={isHistory}
          padding={5}
          onClickOutside={e => setIsHistory(!isHistory)}
          transitionDuration={0.25}
          containerStyle={{width:'25%'}}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={'#54345B'}
              arrowSize={10}
              style={{backgroundColor:'#54345B'}}
            >
              <History turns={gameData.turns}/>
            </ArrowContainer>
          )}
        >
          <Button variant='outline' onClick={() => setIsHistory(!isHistory)} sx={{m:10}}>
            <Heading sx={{fontSize:'medium'}}>history</Heading>
          </Button>
        </Popover>
      </Flex>
    </Flex>
  )
}
