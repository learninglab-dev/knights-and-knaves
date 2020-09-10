import React, { useState, useContext, useEffect } from 'react'
import { Flex, Box, Heading } from 'rebass'
import { dragons,knaves,knights,monks,mysteries } from '../assets/people/index'

export default function Character({children, type}) {
  const charIndex = (type == 'mystery') ? 1 : Math.floor(Math.random() * 4)
  const randomChar = type => {
    const types = {
      'dragon':dragons,
      'knave':knaves,
      'knight':knights,
      'monk':monks,
      'mystery':mysteries
    };
    return types[type][charIndex]
  }
  const charPng = randomChar(type)
  return (
    <Flex
      sx={{
        margin: '10px',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'36vh',
        width:'15vh',
        backgroundImage:`url(${charPng})`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat'
      }}
    >
      {children}
    </Flex>
  )
}
