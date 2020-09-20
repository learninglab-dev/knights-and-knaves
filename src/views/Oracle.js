import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Hints from './Hints'
import History from './History'
import Start from './Start'
import Naming from './Naming'
import Tabs from './Tabs'
import crystalball from '../assets/people/oracle1.png'



export default function Oracle({status, active, condition}) {
  const history = useHistory()
  const gameData = useContext(Data)
  const solved = gameData.solved
  const [isOracle, setIsOracle] = useState(active)

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
                        textShadow:' -0.2vmin 0 black, 0 0.2vmin black, 0.2vmin 0 black, 0 -0.2vmin black'
                      }}>THE ORACLE</Heading>
        <Image src={crystalball} alt='oracle' sx={{width: '100px'}}/>
      </Button>
      {isOracle &&
        <Flex sx={{gridColumn:'2/span 1' , flexDirection:'row',alignItems:'center',height:'30vh'}}>
          <Box
          id='oracleArrow'
          sx={{
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRightStyle: 'solid',
            borderRightWidth: '10px',
            borderRightColor: 'text'}}/>
          <Flex
          id='oracleContainer'
          sx={{
            gridColumn:'2/span 1',
            placeSelf:'center start',
            bg:'text',
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
            {status === 'play' && !solved && condition === undefined &&
              <Tabs defaultIndex={1}>
                <Box id='responses:' sx={{height:'100%', width:'100%'}}>
                  <History turns={gameData.turns} setIsOracle={setIsOracle}/>
                </Box>
                <Box id='instructions:' sx={{mx:20, my: 10, height:'100%',width:'100%'}}>
                  <Hints/>
                </Box>
              </Tabs>
            }
            {status === 'play' && !solved && condition !== undefined &&
              <Tabs defaultIndex={0}>
                <Box id='responses:' sx={{height:'100%', width:'100%'}}>
                  <History turns={gameData.turns} setIsOracle={setIsOracle}/>
                </Box>
                <Box id='instructions:' sx={{mx:20, my: 10, height:'100%',width:'100%'}}>
                  <Hints/>
                </Box>
              </Tabs>
            }
            {solved &&
              <Tabs defaultIndex={0}>
                <Box id='responses:' sx={{ml:20, height:'100%', width:'100%'}}>
                  <History turns={gameData.turns}/>
                </Box>
                <Box id='instructions:' sx={{mx:20, my: 10, height:'100%',width:'100%'}}>
                  <Hints/>
                </Box>
              </Tabs>
            }
          </Flex>
        </Flex>
      }
    </Box>
  )
}
