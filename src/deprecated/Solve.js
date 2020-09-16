import React, { useState, useContext, useEffect, useMemo } from 'react'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import { Select, Label } from '@rebass/forms'
import { Data, DataReducer } from '../data/GameData'
import liveUpdate from '../utils/live'
import { englishifySolve } from '../utils/englishify'
import firebase from 'firebase'


export default function Solve() {
  const updateGame = useContext(DataReducer)
  const solution = useContext(Data).solution
  const uid = useContext(Data).uid
  const names = useMemo(() => Object.keys(solution), [solution])
  const [input, setInput] = useState(Object.fromEntries(names.map(name => [name, ''])))

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/roles`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : Object.fromEntries(names.map(name => [name, '']))
    setInput(update)
    })
    return () => firebase.database().ref(`/${uid}/live/roles`).off()
  }, [uid, names])

  return (
    <Flex sx={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Heading sx={{color:'secondary', fontSize:'medium', textAlign:'center', mb:10}}>enter your solution:</Heading>
      <Flex sx={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        {
          names.map((name, i) =>
            <Box key={i} sx={{m:10}}>
              <Label sx={{fontFamily:'heading',color:'secondary',fontSize:'small', mb:1}}>{name} </Label>
              <Select
                sx={{
                  mb:10,
                  bg:'white',
                  fontFamily:'body',
                  color:'text',
                  textAlign:'center',
                  fontSize:'tiny',
                  width: 100,
                }}
                value={input[name]}
                onChange={e => {
                  setInput({...input, [name]: e.target.value})
                  liveUpdate({type: 'ROLES', uid: uid, name: name, role: e.target.value})
                }}
                >
                <option value="" defaultValue>...</option>
                <option value="K">Knight</option>
                <option value="N">Knave</option>
                <option value="D">Dragon</option>
                <option value="M">Monk</option>
              </Select>
            </Box>
          )
        }
      </Flex>
      <Button
        variant='tertiary'
        sx={{m:10}}
        onClick={() => {
          updateGame({type: 'TAKETURN', turn: input, turnType: 'solve', english: englishifySolve(input)})
          liveUpdate({type: 'RESET', uid: uid})
          setInput(Object.fromEntries(names.map(name => [name, ''])))
        }}
        style={{marginTop: '15px'}}
        >
        <Heading sx={{fontSize:'medium'}}>attempt to solve</Heading>
      </Button>
    </Flex>
  )
}
