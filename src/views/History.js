import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading, Link} from 'rebass'

export default function History({turns, name}) {
  const turnsToShow = !turns ? '' : name ? Object.values(turns).filter(obj => obj.answerer === name) : turns
  const formatTurn = (turnData, i, name) => {
    if (turnData.solution) {
      return JSON.stringify((i+1)+'. Oracle: '+turnData.english, null, 2).replace(/\"/g, "")
    }
    else {
      if (name) {
        return JSON.stringify((i+1)+'. '+turnData.english, null, 2).replace(/\"/g, "")
      }
      else {
        return JSON.stringify((i+1)+'. '+turnData.answerer+': '+turnData.english, null, 2).replace(/\"/g, "")
      }
    }
  }
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
        textAlign: 'center',
        maxHeight:'100%'
      }}
    >
      <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>responses:</Heading>
      <Box sx={{overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr'}}>
        {turnsToShow &&
          Object.values(turnsToShow).map((turn, i) =>
          {
            const color = turn.response || turn.correct ? '#B8E06E' : '#F96989'
            console.log(turn);
            return (
              <>
                <Box sx={{bg:color}}/>
                <Text sx={{gridColumn:'2/span 1',bg:color, color: 'primary', lineHeight: 'history', height:'100%', textAlign:'left'}}>
                  {formatTurn(turn, i, name)}
                </Text>
                <Box sx={{bg:color}}/>
              </>
            )
          }
        )}
      </Box>
    </Flex>
  )
}
