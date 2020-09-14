import React, {
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Button, Heading} from 'rebass'
import { Input, Select } from '@rebass/forms'
import {
  DataReducer,
  Data,
} from '../data/GameData'
import liveUpdate from '../utils/live'
import Character from './Character'
import { defaultNames } from '../data/defaultNames'
import shuffle from '../assets/shuffle.svg'


export default function CharacterBuilder() {
  const updateGame = useCallback(useContext(DataReducer), [])
  const uid = useContext(Data).uid
  const [num, setNum] = useState('')
  const [names, setNames] = useState({})
  const [available, setAvailable] = useState(defaultNames)

  // TODO: add error handling
  useEffect(() => {
    firebase.database().ref(`/${uid}/solution`).on('value', snapshot => {
    const update = snapshot.val()
    updateGame({type: 'SETSOLUTION', solution: update})
    })
    return () => firebase.database().ref(`/${uid}/solution`).off()
  }, [updateGame, uid])
  useEffect(() => {
    firebase.database().ref(`/${uid}/live/numChars`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setNum(update)
    })
    firebase.database().ref(`/${uid}/live/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : {}
    setNames(update)
    })
    return () => {
      firebase.database().ref(`/${uid}/live/numChars`).off()
      firebase.database().ref(`/${uid}/live/names`).off()
    }
  }, [uid])

  const drawDefaultName = (i) => {
    const keys =  Object.keys(available)
    let draw = keys[keys.length * Math.random() << 0]
    const {[draw]: remove, ...rest} = available
    const result = available[draw]
    setAvailable(rest)
    setNames({...names, [i]: result})
    liveUpdate({type: 'NAMES', uid: uid, i: i, value: result})
    return result
  }

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <Box key={i}>
        <Character type='mystery'>
          <Flex sx={{flexDirection:'row'}}>
            <Input
              type='text'
              value={names[i] || ''}
              sx={{
                bg:'white',
                mr: 2,
                fontFamily:'body',
                color:'text',
                textAlign:'center',
                height:35
              }}
              onChange={e => {
                setNames({...names, [i]: e.target.value})
                liveUpdate({type: 'NAMES', uid: uid, i: i, value: e.target.value})
              }}
            />
            <Button
              variant='tertiary'
              sx={{
                backgroundImage: `url(${shuffle})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height:15,
                p:15,
              }}
              onClick={() => drawDefaultName(i)}
            />
          </Flex>
        </Character>
      </Box>
    )
  }

  return (
    <Flex
      sx={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        pt:'10vh',
        width:'100%',
        height:'100%'
      }}>
      <>
        <Text
          sx={{fontFamily:'body',color:'text',textAlign:'center', m:10}}
        >How many islanders will you meet today?</Text>
        <Select
          sx={{
            bg:'white',
            fontFamily:'body',
            color:'text',
            textAlign:'center',
            fontSize:'tiny',
            width: 60,
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
            sx={{fontFamily:'body',color:'text', m:10}}
          >Let's name your islanders:</Text>
          <Flex
            sx={{
              width:'100%',
              flexDirection:'row',
              flexWrap:'wrap',
              justifyContent:'space-evenly',
            }}>
            {characters}
          </Flex>
          <Button variant='tertiary' onClick={() => updateGame({type: 'GENERATESOLUTION', names: names})}><Heading sx={{fontSize:'medium'}}>start the game</Heading></Button>
        </>
      }
    </Flex>
  )
}
