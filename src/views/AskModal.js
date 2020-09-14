import React from 'react'
import {Flex, Heading, Button, Text} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import Character from './Character'
import Ask from './Ask'
import close from '../assets/close.svg'

export default function AskModal({name, show, setAnswerer, setShow}) {
  return (
    <Popover
      isOpen={show}
      padding={5}
      onClickOutside={null}
      transitionDuration={0.25}
      containerStyle={{width:'100%',height:'60%'}}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={'#54345B'}
          arrowSize={10}
          style={{backgroundColor:'#54345B'}}
        >
          <Button
            variant='tertiary'
            sx={{
              backgroundImage: `url(${close})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height:15,
              p:15,
            }}
            onClick={setShow}
          />
          <Ask answerer={name} />
        </ArrowContainer>
      )}
    >
      <Button variant='tertiary' onClick={setAnswerer} sx={{mt:-80}}>
        <Heading sx={{fontSize:'large'}}>{name}</Heading>
      </Button>
    </Popover>
  )
}
