import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link} from 'rebass'

export default function About() {
  return (
    <Text
      sx={{
        color: 'foreground',
        fontFamily: 'body',
        lineHeight: 'body'
      }}
    >
      <Heading sx={{color:'secondary'}}>how to play:</Heading>
      <p>
        You can take two types of turns: (1) ask a question, or (2) attempt to solve. Turn submissions received by the system and responses from islanders will appear in sequence at the bottom.
      </p>
      <Heading sx={{color:'secondary'}}>islander key:</Heading>
      <p>Knights always tell the truth</p>
      <p>Knaves always lie</p>
      <p>Dragons tell the truth except in the presence of a Knight</p>
      <p>Monks say whatever they like</p>
    </Text>
  )
}
