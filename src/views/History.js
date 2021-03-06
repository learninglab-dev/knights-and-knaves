import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Link, Button} from 'rebass'
import { Data } from '../data/GameData'
import theme from '../theme'

export default function History({turns, name}) {
  const solved = useContext(Data).solved
  const history = useHistory()
  const turnsToShow = !turns ? '' : name ? Object.values(turns).filter(obj => obj.answerer === name) : turns
  const latest = !turns || Object.keys(turnsToShow).length === 0 || turns.constructor !== Object
                    ? undefined
                    : turnsToShow[Object.keys(turnsToShow)[Object.keys(turnsToShow).length-1]]

  const Evaluation = () => {
    return (
      <Flex sx={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'auto',height:'100%',px:latest !== undefined ? 80 : 0}}>
          {!latest
            ? <></>
            : 'correct' in latest
            ? <>
                <Heading sx={{
                  color:'secondary',
                  fontSize:'large',
                  color: latest.correct ? 'lightgreen' : 'lightred',
                  mb:20}}>
                  {latest.correct ? 'Correct!' : 'Wrong!'}
                </Heading>
                {solved &&
                  <Button variant='tertiary' onClick={() => {history.push(`/`)}}>
                    <Heading sx={{fontSize:'medium'}}>start over</Heading>
                  </Button>
                }
                </>
            : 'response' in latest &&
              <Heading sx={{
                fontSize:'large',
                color: latest.response ? 'lightgreen' : 'lightred', }}>
                {latest.response ? 'Yes!' : 'No!'}
              </Heading>
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
      {latest !== undefined &&
        <Evaluation />
      }
      <Flex
        sx={{
          width: '100%',
          height:'100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems:'center',
        }}
      >
        <Box sx={{height:'auto', width:'100%', display:'grid', overflow: 'auto', gridTemplateColumns:'1fr auto auto auto 1fr', gridTemplateRows:'min-content', '& > div:nth-child(-n+5)':{ textTransform:'uppercase',borderBottom:'4px solid #3D2642' }}}>
          {turnsToShow &&
            Object.values(turnsToShow).map((turn, i) =>
            {
              const background = turn.response || turn.correct ? theme.colors.lightgreen : theme.colors.lightred
              const color = turn.response || turn.correct ? theme.colors.olive : theme.colors.darkred
              const symbol = turn.response || turn.correct ? '✔' : '✘  '
              return (
                <>
                  <Box sx={{minWidth:'20px', bg:background}}/>
                  <Text sx={{lineHeight: 'history', textAlign:'right', fontFamily:'symbol', fontSize:'small', bg:background, color:color}}>
                    {i+1}.
                  </Text>
                  <Text sx={{lineHeight: 'history', textAlign:'right', fontFamily:'symbol', fontSize:'small', px:2, bg:background, color:color}}>
                    {symbol}
                  </Text>
                  <Text sx={{lineHeight: 'history', fontFamily:'body', fontSize:'tiny', textAlign:'left', py:1, bg:background, color:color}}>
                    {formatTurn(turn, i, name)}
                  </Text>
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
