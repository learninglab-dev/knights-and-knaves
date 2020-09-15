import React, { useState, useContext, useEffect } from 'react'
import { Flex, Box, Heading } from 'rebass'
import {  dragons,
          knaves,
          knights,
          monks,
          mysteries,
          dragons_grey,
          knaves_grey,
          knights_grey,
          monks_grey,
          mysteries_grey } from '../assets/people/index'

export default function Character({children, type, grey}) {
  const charIndex = (type == 'mystery') ? 1 : Math.floor(Math.random() * 4)
  const randomChar = type => {
    let types = {
      'K':knights,
      'N':knaves,
      'D':dragons,
      'M':monks,
      'mystery':mysteries
    };
    return types[type][charIndex]
  }
  const randomCharGrey = type => {
    let types = {
      'K':knights_grey,
      'N':knaves_grey,
      'D':dragons_grey,
      'M':monks_grey,
      'mystery':mysteries_grey
    };
    return types[type][charIndex]
  }
  const charPng = grey ? randomCharGrey(type) : randomChar(type)
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
