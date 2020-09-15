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
    <Box
      sx={{
        display:'grid',
        height:'100%',
        width:'100%',
        gridTemplateColumns: '1fr 6fr'
      }}
    >
      <Button sx={{
        gridColumn:'1/span 1',
        placeSelf:'center end',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        border: 'none',
        bg: 'transparent'
      }} onClick={() => setIsOracle(!isOracle)}>
        <Heading sx={{fontSize:'small', color:'primary', pb:1}}>THE ORACLE</Heading>
        <Image src={crystalball} alt='oracle' sx={{width: '100px'}}/>
      </Button>
      {isOracle &&
        <Flex sx={{flexDirection:'row',alignItems:'center'}}>
          <Box sx={{
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRightStyle: 'solid',
            borderRightWidth: '10px',
            borderRightColor: 'primary'}}/>
          <Flex sx={{
            gridColumn:'2/span 1',
            placeSelf:'center start',
            bg:'primary',
            pt: 20,
            width:'100%',
            flexDirection:'row',
            maxHeight:'25vh',
            height:'100%'
          }}>
            <Box sx={{flexBasis:'25%'}}><History turns={gameData.turns}/></Box>
            <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center',flexBasis:'25%', mx:40}}>
              <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>how to play:</Heading>
              <Text
                sx={{
                  color: 'foreground',
                  fontFamily: 'body',
                  lineHeight: 'body',
                  textAlign: 'center',
                  height:'100%'
                }}
              >You can take two types of turns: (1) ask a question, or (2) attempt to solve. Turn submissions received by the system and responses from islanders will appear in sequence at the bottom.</Text>
            </Flex>
            <Hints/>
          </Flex>
        </Flex>
      }
    </Box>
  )
}
