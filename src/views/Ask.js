import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useCallback
} from 'react'
import firebase from 'firebase'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import { Select, Checkbox, Label } from '@rebass/forms'
import { Data, DataReducer } from '../data/GameData'
import MiniBuilder from './MiniBuilder'
import Character from './Character'
import sentenceBuilder from '../utils/sentenceBuilder'
import liveUpdate from '../utils/live'


const mbDefault = {
  disableNames: false,
  disableQuantifier: false,
  disableNumber: true,
  names: null,
  quantifier: null,
  number: null,
  predicate: null,
  connective: null,
}


export default function Ask({answerer}) {
  const gameData = useContext(Data)
  const uid = gameData.uid
  const updateGame = useContext(DataReducer)
  const names = Object.keys(gameData.solution)
  // const [answerer, setAnswerer] = useState('')
  const [nots, setNots] = useState({1: false, 2: false})
  const [connective, setConnective] = useState('')
  const [mb1, updateMb1] = useReducer(sentenceBuilder, mbDefault)
  const [mb2, updateMb2] = useReducer(sentenceBuilder, mbDefault)

  const setNegation = useCallback((i, update) => {
    setNots(nots => {return {...nots, [i]: update}})
  }, [])

  useEffect(() => {
    // firebase.database().ref(`/${uid}/live/answerer`).on('value', snapshot => {
    // const update = snapshot.val() ? snapshot.val() : ''
    // setAnswerer(update)
    // })
    firebase.database().ref(`/${uid}/live/connective`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setConnective(update)
    })
    firebase.database().ref(`/${uid}/live/builders/${1}/not`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : false
    setNegation(1, update)
    })
    firebase.database().ref(`/${uid}/live/builders/${2}/not`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : false
    setNegation(2, update)
    })
    firebase.database().ref(`/${uid}/live/builders/${1}/predicate`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb1({type: 'predicate', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${2}/predicate`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb2({type: 'predicate', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${1}/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : []
    updateMb1({type: 'names', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${2}/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : []
    updateMb2({type: 'names', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${1}/quantifier`).on('value', snapshot => {
    const update = snapshot.val()
    updateMb1({type: 'quantifier', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${2}/quantifier`).on('value', snapshot => {
    const update = snapshot.val()
    updateMb2({type: 'quantifier', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${1}/number`).on('value', snapshot => {
    const update = snapshot.val()
    updateMb1({type: 'number', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${2}/number`).on('value', snapshot => {
    const update = snapshot.val()
    updateMb2({type: 'number', value: update})
    })
    return () => {
      firebase.database().ref(`/${uid}/live/answerer`).off()
      firebase.database().ref(`/${uid}/live/connective`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/not`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/not`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/number`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/number`).off()
    }
  }, [uid, setNegation])

  const oracleSpeak = () => {
    const validatedMb1 = validateQ(mb1)
    if (!validatedMb1) {
      return 'invalid'
    }
    const p = [mb1.predicate, mb1.names? mb1.names : mb1.number ? [mb1.quantifier, mb1.number] : [mb1.quantifier]]
    const negations = nots[1] ? nots[2] ? 'BOTH' : 'ONE' : nots[2] ? 'TWO' : 'NEITHER'
    if (!connective) {
      if (negations === 'ONE') {
        return {
          1: p,
          c: 'NOT'
        }
      }
      return p
    }
    const validatedMb2 = validateQ(mb2)
    if (!validatedMb2) {
      return 'invalid'
    }
    const q = [mb2.predicate, mb2.names? mb2.names : mb2.number ? [mb2.quantifier, mb2.number] : [mb2.quantifier]]
    switch (negations) {
    case 'NEITHER':
      return {
        1: p,
        2: q,
        c: connective
      }
    case 'BOTH':
      return {
        1: {
          1: p,
          c: 'NOT'
        },
        2: {
          1: q,
          c: 'NOT'
        },
        c: connective
      }
    case 'ONE':
      return {
        1: {
          1: p,
          c: 'NOT'
        },
        2: q,
        c: connective
      }
    case 'TWO':
      return {
        1: p,
        2: {
          1: q,
          c: 'NOT'
        },
        c: connective
      }
    default:
      return
    }
  }

  return (
    <Flex sx={{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height: '100%',
      width:'100%',
      p: 10
    }}>
        {/*<select
          onChange={e => {
            setAnswerer(e.target.value)
            liveUpdate({type: 'ANSWERER', answerer: e.target.value, uid: uid})
          }}
          value={answerer}
          >
          <option value='' key={'empty'}>select a character...</option>
          {names.map(name => <option value={name} key={name}>{name}</option>)}
        </select>*/}
      <Heading sx={{color:'secondary', fontSize:'medium', textAlign:'center', mb:10}}>build your question:</Heading>
      <Flex sx={{flexDirection:'row'}}>
        <MiniBuilder
          key={1}
          i={1}
          names={names}
          uid={uid}
          updateSentence={updateMb1}
          sentence={mb1}
          />
        <Flex sx={{flexDirection:'column',justifyContent:'flex-start',alignItems:'center', ml:4}}>
          <Label sx={{fontFamily:'heading',color:'secondary',fontSize:'small', mb:3}}>
            not
            <Checkbox
              sx={{ml:3, bg:'secondary'}}
              checked={nots[1]}
              onChange={() => {
                liveUpdate({type: 'BUILDER', uid: uid, i: 1, property: 'not', value: !nots[1]})
                }}
              />
          </Label>
          <Label sx={{fontFamily:'heading',color:'secondary',fontSize:'small', mb:1}}>
            + connective
            <Select
              sx={{
                ml: 3,
                bg:'white',
                fontFamily:'body',
                color:'text',
                textAlign:'center',
                fontSize:'tiny',
                width: 60,
              }}
              value={connective}
              onChange={e => {
                setConnective(e.target.value)
                liveUpdate({type: 'CONNECTIVE', connective: e.target.value, uid: uid})
              }}
              >
              <option value='' key={'empty'}>...</option>
              {['AND', 'OR', 'IF', 'IFF'].map(connective => <option value={connective} key={connective}>{connective}</option>)}
            </Select>
          </Label>
        </Flex>
      </Flex>
      {connective &&
        <Flex sx={{flexDirection:'column'}}>
          <MiniBuilder
            key={2}
            i={2}
            names={names}
            uid={uid}
            updateSentence={updateMb2}
            sentence={mb2}
            />
          <Label sx={{fontFamily:'heading',color:'secondary',fontSize:'small', mb:3}}>
            not
            <Checkbox
              sx={{ml:3, bg:'secondary'}}
              checked={nots[2]}
              onChange={() => {
                liveUpdate({type: 'BUILDER', uid: uid, i: 2, property: 'not', value: !nots[2]})
                }}
              />
          </Label>
        </Flex>
      }

      <Button
        onClick={() => {
          updateGame({
            type: 'TAKETURN',
            turn: oracleSpeak(),
            copy: oracleSpeak(),
            turnType: 'question',
            answerer: answerer
          })
          liveUpdate({type: 'RESET', uid: uid})
          updateMb1({type: 'RESET'})
          updateMb2({type: 'RESET'})
        }}
      >
        ask!
      </Button>
    </Flex>
  )
}

const validateQ = (builder) => {
  if (!builder.predicate) {
    return false
  }
  if (!builder.names && !builder.quantifier) {
    return false
  }
  if (builder.quantifier === 'same' || builder.quantifier === 'different') {
    if (builder.num <= 1 && builder.names.length <= 1) {
        return false
    }
  }
  if (builder.quantifier === 'most' || builder.quantifier === 'least' || builder.quantifier === 'more' || builder.quantifier === 'less') {
    if (!builder.num) {
      return false
    }
  }
  return true
}
