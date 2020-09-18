import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Flex, Box, Text, Heading, Link as Alink, Button} from 'rebass'
import { Select, Input } from '@rebass/forms'
import firebase from 'firebase'
import liveUpdate from '../utils/live'
import { DataReducer, Data } from '../data/GameData'
import About from './About'
import Character from './Character'
import { defaultNames } from '../data/defaultNames'
import shuffle from '../assets/shuffle.png'




export default function Naming() {
  const updateGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const uid = gameData.uid
  const [num, setNum] = useState('')
  const [names, setNames] = useState({})
  const [available, setAvailable] = useState(defaultNames)


  const drawDefaultName = (i) => {
    const keys =  Object.keys(available)
    let draw = keys[keys.length * Math.random() << 0]
    const {[draw]: remove, ...rest} = available
    const result = available[draw] || ''
    setAvailable(rest)
    setNames({...names, [i]: result})
    liveUpdate({type: 'NAMES', uid: uid, i: i, value: result})
    return result
  }


  return (
    <Flex
      sx={{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width: '100%',
      }}
    >
      <>
        <Text
          sx={{fontFamily:'body',color:'foreground', fontSize:'small'}}
        >How many islanders will you meet today?</Text>
        <Select
          sx={{
            bg:'white',
            fontFamily:'body',
            color:'text',
            textAlign:'left',
            fontSize:'medium',
            width: 50,
          }}
          value={num}
          onChange={e => {
            setNum(e.target.value)
            liveUpdate({type: 'NUMCHARS', uid: uid, num: e.target.value})
          }}
          >
          <option value='' key={'empty'}>...</option>
          {[1,2,3,4,5,6].map(number => <option value={number} key={number}>{number}</option>)}
        </Select>
      </>
      {num &&
        <>
          <Text
            sx={{fontFamily:'body',color:'text',textAlign:'center', fontSize:'medium', m:10}}
          >Let's name your islanders:</Text>
          <Button variant='tertiary' onClick={() => updateGame({type: 'GENERATESOLUTION', names: names})}><Heading sx={{fontSize:'medium'}}>start the game</Heading></Button>
        </>
      }
    </Flex>
  )
}
