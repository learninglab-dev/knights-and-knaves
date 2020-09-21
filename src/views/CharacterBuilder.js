import React, {
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Button, Heading} from 'rebass'
import { Input, Select, Label } from '@rebass/forms'
import {
  DataReducer,
  Data,
} from '../data/GameData'
import liveUpdate from '../utils/live'
import Character from './Character'
import { defaultNames } from '../data/defaultNames'
import shuffle from '../assets/shuffle.png'


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
    const result = available[draw] || ''
    setAvailable(rest)
    setNames({...names, [i]: result})
    liveUpdate({type: 'NAMES', uid: uid, i: i, value: result})
    return result
  }

  let characters = []
  for (let i = 0; i < num; i++) {
    characters.push(
      <Flex key={i} sx={{flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
        <Input
          type='text'
          value={names[i] || ''}
          placeholder='name'
          sx={{
            bg:'transparent',
            mr: 2,
            fontFamily:'heading',
            color:'secondary',
            textAlign:'center',
            fontSize:'large',
            textShadow:' -0.4vmin 0 black, 0 0.4vmin black, 0.4vmin 0 black, 0 -0.4vmin black',
            height:'auto',
            border:'none',
            width:'100%'
          }}
          onChange={e => {
            setNames({...names, [i]: e.target.value})
            liveUpdate({type: 'NAMES', uid: uid, i: i, value: e.target.value})
          }}
        />
        <Button
          variant='invisible'
          sx={{
            backgroundImage: `url(${shuffle})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height:50,
            width:60,
          }}
          onClick={() => drawDefaultName(i)}
        />
        <Character type='mystery'/>

      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        height:'100%'
      }}>
        <>
          {num &&
            <Flex
              sx={{
                width:'100%',
                flexDirection:'row',
                flexWrap:'no-wrap',
                justifyContent:'space-evenly',
              }}>
              {characters}
            </Flex>
          }
          <Flex sx={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%', mt:40}}>
            <Label sx={{width:'auto', height:'auto', mr:3}}>
              <Heading sx={{color: 'primary', fontSize:'medium', textAlign:'right'}}>
                Number of Islanders
              </Heading>
            </Label>
            <Select
              sx={{
                bg:'secondary',
                fontFamily:'body',
                fontWeight:'bold',
                color:'primary',
                textAlign:'left',
                fontSize:'small',
                borderColor:'primary',
                borderWidth: 3,
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
            <Button variant='tertiary' onClick={() => updateGame({type: 'GENERATESOLUTION', names: names, num: num})} sx={{ml:4}}><Heading sx={{fontSize:'medium'}}>start the game</Heading></Button>
          </Flex>

        </>
    </Flex>
  )
}
