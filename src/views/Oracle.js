import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Hints from './Hints'
import History from './History'
import Start from './Start'
import Naming from './Naming'
import crystalball from '../assets/people/oracle1.png'

const Tabs = ({children}) => {
  const [active, setActive] = useState(null)
  return (
    <>
    </>
  )
}

export default function Oracle({status}) {
  const history = useHistory()
  const gameData = useContext(Data)
  console.log('status'+JSON.stringify(status));
  const [isOracle, setIsOracle] = useState(false)
  
  useEffect(()=>{
    if (status == 'start' || status == 'naming' || status == 'true' || status == 'false' || status =='play') {
      setIsOracle(true)
      console.log('toggled');
    }
  },[status])


  return (
    <Box
      sx={{
        display:'grid',
        height:'30vh',
        width:'100%',
        gridTemplateColumns: '1fr 6fr',
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
        <Flex sx={{gridColumn:'2/span 1' , flexDirection:'row',alignItems:'center',height:'30vh'}}>
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
            pl: 40,
            pt: 20,
            pb: 10,
            width:'100%',
            flexDirection:'row',
            height:'100%',
            maxHeight:'30vh',
            justifyContent:'space-between',
            alignItems:'flex-start',
          }}>
            {status === 'start' &&
              <Start />
            }
            {status === 'naming' &&
              <Naming />
            }
            {status === 'play' &&
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
                <Box sx={{flexBasis:'40%'}}>
                  <Hints/>
                </Box>
              </>
            }
            {gameData.solution &&
            <Box sx={{ml:20, height:'100%'}}><History turns={gameData.turns}/></Box>
            }
          </Flex>
        </Flex>
      }
    </Box>
  )
}
