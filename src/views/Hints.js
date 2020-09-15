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
          justifyContent:'space-evenly',
          alignItems:'flex-start'
        }}
      >
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'20%', mx:2}}>
          <Image src={knight} sx={{height: '10vh', mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny'}}>Knights always tell the truth</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'20%', mx:2}}>
          <Image src={knave} sx={{height: '10vh', mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny'}}>Knaves always lie</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'20%', mx:2}}>
          <Image src={dragon} sx={{height: '10vh', mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny'}}>Dragons tell the truth...except in the presence of a Knight</Text>
        </Flex>
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', flexBasis:'20%', mx:2}}>
          <Image src={monk} sx={{height: '10vh', mb:3}}/>
          <Text sx={{color: 'foreground',fontFamily: 'body',lineHeight: 'body',textAlign: 'center',fontSize:'tiny'}}>Monks say whatever they like</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
