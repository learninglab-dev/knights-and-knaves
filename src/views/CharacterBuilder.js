import React, {
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Button, Heading} from 'rebass'
import { Input } from '@rebass/forms'
import {
  DataReducer,
  Data,
} from '../data/GameData'
import liveUpdate from '../utils/live'
import Character from './Character'


export default function CharacterBuilder() {
  const updateGame = useCallback(useContext(DataReducer), [])
  const uid = useContext(Data).uid
  const [num, setNum] = useState('')
  const [names, setNames] = useState({})

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

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <Box key={i}>
        <Character type='mystery'>
          <Input
            type='text'
            value={names[i] || ''}
            sx={{
              mb:'10vh',
              bg:'white',
              fontFamily:'body',
              color:'text',
              textAlign:'center'
            }}
            onChange={e => {
              setNames({...names, [i]: e.target.value})
              liveUpdate({type: 'NAMES', uid: uid, i: i, value: e.target.value})
            }}
          />
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
        width:'60%',
        height:'100%'
      }}>
      <>
        <Text
          sx={{fontFamily:'body',color:'text',textAlign:'center', m:10}}
        >How many islanders will you meet today?</Text>
        <Input
          sx={{ width:'60px',
                mb: '20px',
                bg:'white',
                fontFamily:'body',
                color:'text',
                textTransform:'uppercase',
                textAlign:'center'}}
          placeholder='(1-6)'
          key='numChars'
          type='text'
          value={num}
          onChange={e => {
            setNum(e.target.value)
            liveUpdate({type: 'NUMCHARS', uid: uid, num: e.target.value})
          }}
          ></Input>
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
