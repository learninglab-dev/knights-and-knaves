import React from 'react'
import {Flex, Text, Heading, } from 'rebass'


export default function Naming() {
  return (
      <Flex
        sx={{
          flexDirection:'row',
          justifyContent:'space-evenly',
          alignItems:'center',
          width: '100%',
          height:'100%'
        }}
      >
        <Text
          sx={{fontFamily:'body',color:'foreground', fontSize:'small', mx:20, my:10, flexBasis:'60%',overflow:'auto',maxHeight:'30vh'}}
        >
          <p>Excellent! I'm always up here if you need help remembering the rules. You can click the crystal ball to toggle me on and off, it won't disturb your teammates. </p>
          <p>Time to make some decisions with your team! How many islanders will you meet? And what will their names be?</p>
        </Text>

      </Flex>
  )
}
