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
      <Heading sx={{color:'secondary',fontSize:'medium', mb:3}}>islander key:</Heading>
      <Flex
        sx={{
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'space-evenly'
        }}
      >
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'25%', mx:1}}>
          <Image src={knight} sx={{height: 150, mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%'}}>Knights always tell the truth</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'25%', mx:1}}>
          <Image src={knave} sx={{height: 150, mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%'}}>Knaves always lie</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'25%', mx:1}}>
          <Image src={dragon} sx={{height: 150, mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%'}}>Dragons tell the truth...except in the presence of a Knight</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'25%', mx:1}}>
          <Image src={monk} sx={{height: 150, mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'left',height:'100%'}}>Monks say whatever they like</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
