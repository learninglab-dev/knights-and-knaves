import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useCallback
} from 'react'
import firebase from 'firebase'
import {Flex, Text, Heading, Button } from 'rebass'
import { Select, Checkbox, Label } from '@rebass/forms'
import { Data, DataReducer } from '../data/GameData'
import MiniBuilder from './MiniBuilder'
// import Character from './Character'
import sentenceBuilder from '../utils/sentenceBuilder'
import liveUpdate from '../utils/live'
import { englishify, completeEnglish } from '../utils/englishify'
import { oracleSpeak } from '../utils/oracleSpeak'


const mbDefault = {
  disableNames: false,
  disableQuantifier: false,
  disableNumber: true,
  names: '',
  quantifier: '',
  number: '',
  predicate: '',
  connective: '',
}


export default function Ask({ answerer }) {
  const gameData = useContext(Data)
  const uid = gameData.uid
  const updateGame = useContext(DataReducer)
  const names = Object.keys(gameData.solution)
  const [nots, setNots] = useState({1: false, 2: false})
  const [connective, setConnective] = useState('')
  const [mb1, updateMb1] = useReducer(sentenceBuilder, mbDefault)
  const [mb2, updateMb2] = useReducer(sentenceBuilder, mbDefault)
  const not1Color = nots[1] ? '#F58B00' : '#aaaaaa'
  const not2Color = nots[2] ? '#F58B00' : '#aaaaaa'
  const connectiveColor = connective ? '#F58B00' : '#aaaaaa'

  const setNegation = useCallback((i, update) => {
    setNots(nots => {return {...nots, [i]: update}})
  }, [])

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/builders`).on('value', snapshot => {
    const update = snapshot.val()
    if (update === 'CLEAR') {
      updateMb1({type: 'RESET'})
      updateMb2({type: 'RESET'})
    }
    })
    firebase.database().ref(`/${uid}/live/connective/${answerer}`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setConnective(update)
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/not`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : false
    setNegation(1, update)
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/not`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : false
    setNegation(2, update)
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/predicate`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb1({type: 'predicate', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/predicate`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb2({type: 'predicate', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : []
    updateMb1({type: 'names', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/names`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : []
    updateMb2({type: 'names', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/quantifier`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb1({type: 'quantifier', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/quantifier`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb2({type: 'quantifier', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/number`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb1({type: 'number', value: update})
    })
    firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/number`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    updateMb2({type: 'number', value: update})
    })
    return () => {
      firebase.database().ref(`/${uid}/live/connective/${answerer}`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/not`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/not`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${1}/number`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}/${2}/number`).off()
      firebase.database().ref(`/${uid}/live/builders/${answerer}`).off()
    }
  }, [uid, setNegation, answerer])

  return (
    <Flex sx={{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height: '100%',
      width:'100%',
      }}
    >
      <Heading sx={{color:'secondary', fontSize:'medium', textAlign:'center', mb:3}}>build your question:</Heading>
      <Flex sx={{width:'100%',flexDirection:'row'}}>
        <Flex sx={{width:'100%',flexDirection:'row', alignItems:'flex-start', pr:'5%'}}>
            <Label sx={{mr:20, mt:1, width:'auto', height:'auto'}}>
              <Checkbox
                sx={{bg:'darkgreen',color:'primary'}}
                checked={nots[1]}
                onClick={() => {liveUpdate({type: 'BUILDER', uid: uid, i: 1, property: 'not', answerer: answerer, value: !nots[1]})}}/>
              <Heading sx={{color: not1Color, fontSize:'medium', textAlign:'left', ml:2}}>NOT</Heading>
            </Label>
          <MiniBuilder
            key={1}
            i={1}
            names={names}
            uid={uid}
            updateSentence={updateMb1}
            sentence={mb1}
            answerer={answerer}
            />
        </Flex>
        {connective &&
          <Flex sx={{width:'100%',flexDirection:'row', alignItems:'flex-start', pr:'5%'}}>
            <Label sx={{mr:20, mt:1, width:'auto', height:'auto'}}>
              <Checkbox
                sx={{bg:'darkgreen',color:'primary'}}
                checked={nots[2]}
                onClick={() => {liveUpdate({type: 'BUILDER', uid: uid, i: 2, property: 'not', answerer: answerer, value: !nots[2]})}}/>
              <Heading sx={{color: not2Color, fontSize:'medium', textAlign:'left', ml:2}}>NOT</Heading>
            </Label>
            <MiniBuilder
              key={2}
              i={2}
              names={names}
              uid={uid}
              updateSentence={updateMb2}
              sentence={mb2}
              answerer={answerer}
              />
          </Flex>
        }
      </Flex>
      <Flex sx={{flexDirection:'row',alignItems:'center', my:3}}>
        <Heading sx={{fontFamily:'heading',color:connectiveColor,fontSize:'medium', mb:1}}>+</Heading>
        <Select
          sx={{
            ml: 3,
            my:1,
            bg:'secondary',
            fontFamily:'body',
            fontWeight:'bold',
            color:'primary',
            textAlign:'left',
            fontSize:'small',
            borderColor:'foreground',
            borderWidth: 3,
            width: 80,
          }}
          value={connective}
          onChange={e => {
            // setConnective(e.target.value)
            liveUpdate({type: 'CONNECTIVE', connective: e.target.value, answerer: answerer, uid: uid})
          }}
          >
          <option value='' key={'empty'}>...</option>
          {['AND', 'OR', 'IF', 'IFF'].map(connective => <option value={connective} key={connective}>{connective}</option>)}
        </Select>
      </Flex>
      <Heading sx={{fontFamily:'heading',color:'foreground',fontSize:'medium', my:4}}>
        Is it true that {' '}
        <Text as='span' sx={{color: 'secondary'}}>
          <Text as='span' sx={{color: 'secondary'}}>{connective === 'IF'? ' IF ' : ''}</Text>
          {englishify(mb1, nots[1])}
          {connective &&
            <>
            <Text as='span' sx={{color: 'foreground'}}>{connective === 'IF'? ',' : ' ' + connective}{' '}</Text>
            <Text as='span' sx={{color: 'secondary'}}>{englishify(mb2, nots[2])}</Text>
            </>
          }
        </Text> ?
      </Heading>
      <Button
        variant='tertiary'
        sx={{my:4}}
        onClick={() => {
          updateGame({
            type: 'TAKETURN',
            turn: oracleSpeak(mb1, mb2, connective, nots),
            copy: oracleSpeak(mb1, mb2, connective, nots),
            english: completeEnglish(mb1, mb2, connective, nots),
            turnType: 'question',
            answerer: answerer
          })
          liveUpdate({type: 'CLEAR_BUILDERS', uid: uid})
          // liveUpdate({type: 'CLEAR_ANSWERER', uid: uid})
          liveUpdate({type: 'CLEAR_CONNECTIVE', uid: uid})
        }}
      >
        <Heading sx={{fontSize:'medium'}}>ask!</Heading>
      </Button>
    </Flex>
  )
}
