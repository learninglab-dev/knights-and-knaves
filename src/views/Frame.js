import React, { useState, useContext, useEffect } from 'react'
import {Box, Heading} from 'rebass'
import { Data } from '../data/GameData'
import Bug from './Bug'
import Credits from './Credits'
import Oracle from './Oracle'

export default function Frame({children}) {
  const gameData = useContext(Data)

  return (
    <Box
      sx={{
        display:'grid',
        height:'100%',
        width:'100%',
        gridTemplateColumns: '1fr 5fr 1fr',
        gridTemplateRows: '2fr 5fr 1fr',
      }}
    >
      <Box sx={{gridColumn:'2/span 1', gridRow:'2/span 1'}}>{children}</Box>
      {gameData.solution &&
        <Box sx={{gridColumn:'1/span 3', gridRow:'1/span 1'}}><Oracle /></Box>
      }
      <Box sx={{gridColumn:'1/span 1', gridRow:'3/span 1', placeSelf:'center end'}}><Credits/></Box>
      <Box sx={{gridColumn:'3/span 1', gridRow:'3/span 1', placeSelf:'center start'}}><Bug/></Box>
    </Box>
  )
}
