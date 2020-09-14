import React, {useContext} from 'react'
import {Flex, Heading, Button, Text} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Character from './Character'
import Ask from './Ask'
import History from './History'
import close from '../assets/close.svg'

export default function AskModal({name, show, setAnswerer, setShow}) {
  const gameData = useContext(Data)
  console.log(gameData);
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
          style={{backgroundColor:'#54345B', marginTop:10, paddingTop:20, paddingBottom:20, display:'flex', flexDirection:'column',alignItems:'center', overflow: 'auto'}}
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
          <History turns={gameData.turns}/>
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
