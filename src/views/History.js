import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link} from 'rebass'

export default function History({turns}) {
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'stretch',
        color: 'foreground',
        fontFamily: 'body',
        lineHeight: 'body',
        textAlign: 'center'
      }}
    >
      <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>history:</Heading>
        {turns &&
          Object.values(turns).map((turn, i) =>
          {
            const color = turn.response || turn.correct ? '#B8E06E' : '#F96989'
            return (
              <Box sx={{bg:color,p:0}}>
                <Text sx={{color: 'primary'}}>{JSON.stringify(turn.english, null, 2)}</Text>
              </Box>
            )
          }
        )}
    </Flex>
  )
}
