import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Heading} from 'rebass'

export default function Frame({children}) {
  return (
    <Flex
      sx={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%'
      }}
    >
      {children}
    </Flex>
  )
}
