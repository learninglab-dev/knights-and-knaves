import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link, Image} from 'rebass'
import { dragons,knaves,knights,monks } from '../assets/people/index'

export default function About() {
  const knight = knights[Math.floor(knights.length * Math.random())]
  const knave = knaves[Math.floor(knaves.length * Math.random())]
  const dragon = dragons[Math.floor(dragons.length * Math.random())]
  const monk = monks[Math.floor(monks.length * Math.random())]

  return (
    <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
      <Heading sx={{color:'secondary',fontSize:'medium', mb:2}}>islander key:</Heading>
      <Flex
        sx={{
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'center'
        }}
      >
        <Image src={knight} sx={{height: 75, width:33, mr:2}}/>
        <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%', mr:2}}>Knights always tell the truth</Text>
        <Image src={knave} sx={{height: 75, width:33, mr:2}}/>
        <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%', mr:2}}>Knaves always lie</Text>
        <Image src={dragon} sx={{height: 75, width:33, mr:2}}/>
        <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%', mr:2}}>Dragons tell the truth...except in the presence of a Knight</Text>
        <Image src={monk} sx={{height: 75, width:33, mr:2}}/>
        <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%', mr:2}}>Monks say whatever they like</Text>
      </Flex>
    </Flex>
  )
}
