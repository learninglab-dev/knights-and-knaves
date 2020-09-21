import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link} from 'rebass'
import { dragons,knaves,knights,monks } from '../assets/people/index'

export default function About() {
  const knight = knights[Math.floor(knights.length * Math.random())]
  const knave = knaves[Math.floor(knaves.length * Math.random())]
  const dragon = dragons[Math.floor(dragons.length * Math.random())]
  const monk = monks[Math.floor(monks.length * Math.random())]

  const charHeight= '19vh'
  const charWidth= '8vh'

  return (
    <Flex sx={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'flex-start'}}>
      <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', width:'20%', mx:30}}>
        <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>how to play:</Heading>
        <Text
          sx={{
            color: 'foreground',
            fontFamily: 'body',
            lineHeight: 'body',
            textAlign: 'center',
            fontSize:'tiny'
          }}
        >You can take two types of turns: (1) ask a question, or (2) attempt to solve. Click an islander to ask them a question; fill in identities and click "attempt to solve" to solve. Responses will appear here in the "responses" tab.</Text>
      </Flex>
      <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', width:'80%', height:'100%', mx:30}}>
        <Heading sx={{color:'secondary',fontSize:'medium', mb:3}}>islander key:</Heading>
        <Flex
          sx={{
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'flex-start'
          }}
        >
          <Flex sx={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',height:'100%'}}>
            <Box sx={{backgroundImage:`url(${knight})`, backgroundSize:'contain', backgroundRepeat:'no-repeat', height: charHeight, width:charWidth}}/>
            <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny',width:'10%'}}>Knights always tell the truth</Text>
            <Box sx={{backgroundImage:`url(${knave})`, backgroundSize:'contain', backgroundRepeat:'no-repeat', height: charHeight, width:charWidth}}/>
            <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny',width:'10%'}}>Knaves always lie</Text>
            <Box sx={{backgroundImage:`url(${dragon})`, backgroundSize:'contain', backgroundRepeat:'no-repeat', height: charHeight, width:charWidth}}/>
            <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny',width:'10%'}}>Dragons tell the truth...except in the presence of a Knight</Text>
            <Box sx={{backgroundImage:`url(${monk})`, backgroundSize:'contain', backgroundRepeat:'no-repeat', height: charHeight, width:charWidth}}/>
            <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny',width:'10%'}}>Monks say whatever they like</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
