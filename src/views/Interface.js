import React, { useContext, useEffect, useCallback, useState } from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import { Data, DataReducer } from '../data/GameData'
import Solve from './Solve'
import Ask from './Ask'
import Hints from './Hints'
import Popover, {ArrowContainer} from 'react-tiny-popover'



export default function Interface() {
  const [isHint, setIsHint] = useState(null)
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
        justifyContent:'flex-start',
        pt:'10vh',
        width:'60%',
        height:'100%',
      }}>
      { solved && <h1>you win!!!</h1>}
      <Ask />
      <Popover
        isOpen={isHint}
        position={'left'}
        padding={5}
        onClickOutside={e => setIsHint(!isHint)}
        transitionDuration={0.25}
        containerStyle={{width:'60%'}}
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={'#54345B'}
            arrowSize={10}
            style={{backgroundColor:'#54345B', margin:'10px', padding:'10px 30px'}}
          >
          <Hints />
          </ArrowContainer>
        )}
      >
        <Button variant='outline' onClick={() => setIsHint(!isHint)}>
          <Heading>?</Heading>
        </Button>
      </Popover>
      <div style={{border: '2px solid black', paddingLeft: '10px', paddingBottom: '20px', width: '45vw', marginTop: '25px'}}>
        <Solve />
      </div>
      <div>
        <h2>turns:</h2>
        {gameData.turns &&
          Object.values(gameData.turns).map((turn, i) =>
          {
            const color = turn.response || turn.correct ? 'green' : 'red'
            return <p key={i} style={{color: color}}>{i+1}. {JSON.stringify(turn, null, 2)}</p>
          }
        )}
      </div>
    </Flex>
  )
}
