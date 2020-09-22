import React, {useState, useEffect, useContext} from 'react'
import {
  Flex,
  Box,
  Heading,
  Button,
  Image
} from 'rebass'
import { Data } from '../data/GameData'
import Hints from './Hints'
import History from './History'
import Start from './Start'
import Naming from './Naming'
import Tabs from './Tabs'
import crystalball from '../assets/people/oracle1.png'



export default function Oracle({ controller, setOracle, setTab }) {
  const gameData = useContext(Data)

  const oracleContent = () => {
    console.log(controller.content)
    console.log(gameData)
    switch (controller.content) {
    case 'start':
      return <Start />
    case 'naming':
      return <Naming />
    case 'play':
      return (
        <Tabs setTab={setTab} activeTab={controller.tab}>
          <Box id='responses:' sx={{height:'100%', width:'100%'}}>
            <History turns={gameData.turns} setIsOracle={setOracle}/>
          </Box>
          <Box id='instructions:' sx={{mx:20, my: 10, height:'100%',width:'100%'}}>
            <Hints/>
          </Box>
        </Tabs>
      )
    case 'solved':
      return (
        <Tabs activeTab={'one'}>
          <Box id='responses:' sx={{ml:20, height:'100%', width:'100%'}}>
            <History turns={gameData.turns}/>
          </Box>
          <Box id='instructions:' sx={{mx:20, my: 10, height:'100%',width:'100%'}}>
            <Hints/>
          </Box>
        </Tabs>
      )
    default:

    }
  }

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
      }} onClick={setOracle}>
        <Heading sx={{  fontSize:'small',
                        color:'darkgreen',
                        pb:1,
                        textShadow:' -0.2vmin 0 black, 0 0.2vmin black, 0.2vmin 0 black, 0 -0.2vmin black'
                      }}>THE ORACLE</Heading>
        <Image src={crystalball} alt='oracle' sx={{width: '100px'}}/>
      </Button>
      {controller.visible &&
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
            {oracleContent()}
          </Flex>
        </Flex>
      }
    </Box>
  )
}
