import React, {useState, useContext} from 'react'
import crystalball from '../assets/people/oracle1.png'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Hints from './Hints'
import History from './History'

export default function Oracle({ onClick }) {
  const gameData = useContext(Data)
  const credits = []
  const [isOracle, setIsOracle] = useState(false)
  return (
    <Popover
      isOpen={isOracle}
      position={['right']}
      onClickOutside={e => setIsOracle(!isOracle)}
      transitionDuration={0.25}
      containerStyle={{width:'50%'}}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={'#54345B'}
          arrowSize={10}
          style={{backgroundColor:'#54345B',marginLeft:10, padding:'20px'}}
        >
          <Flex sx={{flexDirection:'row'}}>
            <Hints />
            <History turns={gameData.turns}/>
          </Flex>
        </ArrowContainer>
      )}
    >
      <Button sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        border: 'none',
        bg: 'transparent'
      }} onClick={() => setIsOracle(!isOracle)}>
        <Heading sx={{fontSize:'small', color:'primary', pb:1}}>THE ORACLE</Heading>
        <Image src={crystalball} alt='oracle' sx={{width: '100px'}}/>
      </Button>
    </Popover>

  )
}
