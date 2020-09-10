import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link} from 'rebass'

export default function History({turns}) {
  return (
    <Text
      sx={{
        color: 'foreground',
        fontFamily: 'body',
        lineHeight: 'body',
        textAlign: 'center'
      }}
    >
      <Heading sx={{color:'secondary', fontSize:'medium'}}>turns:</Heading>
        {turns &&
          Object.values(turns).map((turn, i) =>
          {
            const color = turn.response || turn.correct ? '#B8E06E' : '#F96989'
            return <p key={i} style={{color: color}}>{i+1}. {JSON.stringify(turn, null, 2)}</p>
          }
        )}
    </Text>
  )
}
