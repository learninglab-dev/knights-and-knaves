import React, { useState, useContext, useEffect } from 'react'
import {Box, Heading} from 'rebass'
import Bug from './Bug'
import Credits from './Credits'
import Oracle from './Oracle'

export default function Frame({children}) {
  return (
    <Box
      sx={{
        display:'grid',
        height:'100%',
        width:'100%',
        gridTemplateColumns: '1fr 5fr 1fr',
        gridTemplateRows: '1fr 5fr 1fr',
      }}
    >
      <Box sx={{gridArea:'2/2/2/2'}}>{children}</Box>
      <Box sx={{gridArea:'1/1/1/1',placeSelf:'center'}}><Oracle/></Box>
      <Box sx={{gridArea:'3/1/3/1',placeSelf:'center'}}><Credits/></Box>
      <Box sx={{gridArea:'3/3/3/3',placeSelf:'center'}}><Bug/></Box>
    </Box>
  )
}
