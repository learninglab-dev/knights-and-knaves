import React, { useContext,useState } from 'react'
import {Flex, Heading, Button} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Character from './Character'
import Ask from './Ask'
import liveUpdate from '../utils/live'

export default function AskModal({name, show, setShow}) {

  const gameData = useContext(Data)
  const uid = gameData.uid

  // const handleClick = () => {
  //   liveUpdate({type: 'ANSWERER', answerer: name, uid: uid})
  //   setShow()
  // }

  return (
    <Popover
      isOpen={show}
      padding={5}
      onClickOutside={null}
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
        <Ask answerer={name}/>
        </ArrowContainer>
      )}
    >
      <Button variant='tertiary' onClick={() => setShow()} sx={{mt:-80}}>
        <Heading sx={{fontSize:'large'}}>{name}</Heading>
      </Button>
    </Popover>
  )
}
