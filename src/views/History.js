import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Link, Button} from 'rebass'
import theme from '../theme'

export default function History({turns, name}) {
  const history = useHistory()
  const turnsToShow = !turns ? '' : name ? Object.values(turns).filter(obj => obj.answerer === name) : turns
  const condition = !turns || Object.keys(turns).length === 0 || turns.constructor !== Object
                    ? undefined
                    : 'correct' in turns[Object.keys(turns)[Object.keys(turns).length-1]]
                    ? turns[Object.keys(turns)[Object.keys(turns).length-1]].correct
                    : undefined
  const WinOrLose = () => {
    return (
      <Flex sx={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'auto',height:'100%',mx:80}}>
          {condition === true
            ? <>
                <Heading sx={{color:'secondary', fontSize:'colossal',color:'lightgreen', mb:20}}>Correct!</Heading>
                <Button variant='tertiary' onClick={() => {history.push(`/`)}}>
                  <Heading sx={{fontSize:'medium'}}>start over</Heading>
                </Button>
                </>
            : condition === false
            ? <Heading sx={{fontSize:'large', color:'lightred'}}>Wrong!</Heading>
            : <></>
          }
      </Flex>
    )
  }

  const formatTurn = (turnData, i, name) => {
    if (turnData.solution) {
      return JSON.stringify('Oracle: '+turnData.english, null, 2).replace(/\"/g, "")
    }
    else {
      if (name) {
        return JSON.stringify(turnData.english, null, 2).replace(/\"/g, "")
      }
      else {
        return JSON.stringify(turnData.answerer+': '+turnData.english, null, 2).replace(/\"/g, "")
      }
    }
  }
  return (
    <Flex sx={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height:'100%'
    }}>
      {turns && !name &&
        <WinOrLose />
      }
      <Flex
        sx={{
          width: '100%',
          height:'100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems:'center',
        }}
      >
        <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>responses:</Heading>
        <Box sx={{height:'100%', width:'100%', display:'grid', overflow: 'auto', gridTemplateColumns:'1fr auto 1fr', gridTemplateRows:'min-content'}}>
          {turnsToShow &&
            Object.values(turnsToShow).map((turn, i) =>
            {
              const background = turn.response || turn.correct ? theme.colors.lightgreen : theme.colors.lightred
              const color = turn.response || turn.correct ? theme.colors.olive : theme.colors.darkred
              const symbol = turn.response || turn.correct ? '✔' : '✘'
              console.log(turn);
              return (
                <>
                  <Box sx={{minWidth:'20px', bg:background}}/>
                  <Flex sx={{flexDirection:'row',alignItems:'center', width:'100%', bg:background, color:color}}>
                      <Text sx={{lineHeight: 'history', textAlign:'right', fontFamily:'symbol', fontSize:'small', px:3}}>
                        {symbol}
                      </Text>
                      <Text sx={{lineHeight: 'history', fontFamily:'body', textAlign:'left', py:1}}>
                        {formatTurn(turn, i, name)}
                      </Text>
                  </Flex>
                  <Box sx={{minWidth:'20px', bg:background}}/>
                </>
              )
            }
          ).reverse()}
        </Box>
      </Flex>
    </Flex>
  )
}
