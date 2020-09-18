import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Hints from './Hints'
import History from './History'
import crystalball from '../assets/people/oracle1.png'

export default function Oracle() {
  const history = useHistory()
  const gameData = useContext(Data)
  const [isOracle, setIsOracle] = useState(true)

  useEffect(() => {
    setIsOracle(true)
  },[gameData.solved])

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
        <Heading sx={{  fontSize:'small',
                        color:'darkgreen',
                        pb:1,
                        textShadow:' -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
                      }}>THE ORACLE</Heading>
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
            borderRightColor: 'text'}}/>
          <Flex sx={{
            gridColumn:'2/span 1',
            placeSelf:'center start',
            bg:'text',
            p: 10,
            width:'100%',
            flexDirection:'row',
            maxHeight:'25vh',
            height:'100%',
            justifyContent:'space-between'
          }}>
            {!gameData.solved &&
              <>
                <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center',flexBasis:'20%'}}>
                  <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>how to play:</Heading>
                  <Text
                    sx={{
                      color: 'foreground',
                      fontFamily: 'body',
                      lineHeight: 'body',
                      textAlign: 'center',
                      fontSize:'tiny'
                    }}
                  >You can take two types of turns: (1) ask a question, or (2) attempt to solve. Turn submissions received by the system and responses from islanders will appear in sequence at the bottom.</Text>
                </Flex>
                <Hints/>
              </>
            }
            {gameData.solved &&
              <Flex sx={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'100%',mx:40}}>
                <Heading sx={{color:'secondary', fontSize:'colossal'}}>YOU WIN!!</Heading>
                <Button variant='tertiary' onClick={() => {history.push(`/`)}}><Heading sx={{fontSize:'medium'}}>start over</Heading></Button>
              </Flex>
            }
            <Box sx={{flexBasis:'30%', ml:20}}><History turns={gameData.turns}/></Box>
          </Flex>
        </Flex>
      }
    </Box>
  )
}
