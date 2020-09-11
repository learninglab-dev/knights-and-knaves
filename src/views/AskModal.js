import React from 'react'
import {Flex, Heading, Button, Text} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import Character from './Character'
import Ask from './Ask'

export default function AskModal({name, show, setShow}) {
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
        <Ask answerer={name} />
        </ArrowContainer>
      )}
    >
      <Button variant='tertiary' onClick={setShow} sx={{mt:-80}}>
        <Heading sx={{fontSize:'large'}}>{name}</Heading>
      </Button>
    </Popover>
  )
}
