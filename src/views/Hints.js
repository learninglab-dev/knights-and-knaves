import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link, Image} from 'rebass'
import { dragons,knaves,knights,monks } from '../assets/people/index'

export default function About() {
  const knight = knights[Math.floor(knights.length * Math.random())]
  const knave = knaves[Math.floor(knaves.length * Math.random())]
  const dragon = dragons[Math.floor(dragons.length * Math.random())]
  const monk = monks[Math.floor(monks.length * Math.random())]

  return (
    <Text
      sx={{
        color: 'foreground',
        fontFamily: 'body',
        lineHeight: 'body',
        textAlign: 'center',
      }}
    >
      <Heading sx={{color:'secondary', fontSize:'medium'}}>how to play:</Heading>
      <p>
        You can take two types of turns: (1) ask a question, or (2) attempt to solve. Turn submissions received by the system and responses from islanders will appear in sequence at the bottom.
      </p>
      <Heading sx={{color:'secondary',fontSize:'medium'}}>islander key:</Heading>
      <Box
        sx={{
          display:'grid',
          gridTemplateColumns:'auto auto',
          gridTemplateRows: '1fr 1fr 1fr 1fr',
          columnGap: 3,
          rowGap: 2,
          gridAutoFlow: 'row',
          alignItems: 'center'

        }}
      >
          <Image src={knight} sx={{height: 100, mr:'2%'}}/>
          <p style={{textAlign:'left'}}>Knights always tell the truth</p>
          <Image src={knave} sx={{height: 100, mr:'2%'}}/>
          <p style={{textAlign:'left'}}>Knaves always lie</p>
          <Image src={dragon} sx={{height: 100, mr:'2%'}}/>
          <p style={{textAlign:'left'}}>Dragons tell the truth...except in the presence of a Knight</p>
          <Image src={monk} sx={{height: 100, mr:'2%'}}/>
          <p style={{textAlign:'left'}}>Monks say whatever they like</p>
      </Box>
    </Text>
  )
}
