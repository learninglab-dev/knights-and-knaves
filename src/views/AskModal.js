import React, {useContext} from 'react'
import {Flex, Box, Heading, Button, Text} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Character from './Character'
import Ask from './Ask'
import History from './History'
import close from '../assets/close.svg'

export default function AskModal({name, show, setAnswerer, setShow}) {
  const gameData = useContext(Data)
  const turnsForName = Object.values(gameData.turns).filter(obj => obj.answerer == name)
  return (
    <Popover
      isOpen={show}
      position={'bottom'}
      padding={6}
      windowBorderPadding={0}
      onClickOutside={null}
      transitionDuration={0.25}
      containerStyle={{width:'100%',height:'auto'}}
      disableReposition={false}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={'#54345B'}
          arrowSize={10}
          style={{backgroundColor:'#54345B', marginTop:10, paddingTop:20, paddingBottom:20, display:'flex', flexDirection:'column',alignItems:'center', overflow: 'auto',width:'100%'}}
        >
          <Button
            variant='invisible'
            sx={{
              backgroundImage: `url(${close})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height:20,
              p:10,
              m:1
            }}
            onClick={setShow}
          />
          <Flex sx={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
            <Box sx={{flexBasis:'35%'}}><History turns={turnsForName}/></Box>
            <Box sx={{flexBasis:'60%'}}><Ask answerer={name} /></Box>
          </Flex>
        </ArrowContainer>
      )}
    >
      <Button variant='tertiary' onClick={setAnswerer} sx={{mt:-80}}>
        <Heading sx={{fontSize:'large'}}>{name}</Heading>
      </Button>
    </Popover>
  )
}
