import React, {
  useState,
  useContext,
  useEffect,
  useReducer
} from 'react'
import firebase from 'firebase'
import { Data, DataReducer, Live, LiveReducer } from '../data/GameData'
import MiniBuilder from './MiniBuilder'
import sentenceBuilder from '../utils/sentenceBuilder'


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

// TODO: clear builders after clicking ask
export default function Ask() {
  const gameData = useContext(Data)
  const uid = gameData.uid
  const updateGame = useContext(DataReducer)
  const live = useContext(Live)
  const liveUpdate = useContext(LiveReducer)
  const names = Object.keys(gameData.solution)
  const [answerer, setAnswerer] = useState('')
  const [compoundSentence, setCompound] = useState({1: '', 2: '', c: ''})
  const connectives = ['AND', 'OR', 'IF', 'IFF']

  const [mb1, updateMb1] = useReducer(sentenceBuilder, mbDefault)
  const [mb2, updateMb2] = useReducer(sentenceBuilder, mbDefault)


  const setConjunct = (sentence, i) => {
    if (compoundSentence[i].c) {
      setCompound({...compoundSentence, [i]: {...compoundSentence[i], 1: sentence}})
      return
    }
    setCompound({...compoundSentence, [i]: sentence})
    return
  }
  const setNegation = i => {
    if (compoundSentence[i].c) {
      setCompound({...compoundSentence, [i]: compoundSentence[i][1]})
      return
    }
    setCompound({...compoundSentence, [i]: {1: compoundSentence[i], c: 'NOT'}})
  }

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/connective`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    liveUpdate({type: 'SETCONNECTIVE', connective: update, uid: uid})
    })
    return () => firebase.database().ref(`/${uid}/live/connective`).off()
  }, [liveUpdate, uid])
  useEffect(() => {
    if (live.connective) {
      setCompound(compoundSentence => {return {...compoundSentence, c: live.connective}})
    }
  }, [live.connective])
  useEffect(() => {
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
    // firebase.database().ref(`/${uid}/live/builders/${1}/quantifier`).on('value', snapshot => {
    // const update = snapshot.val() ? snapshot.val() : ''
    // updateMb1({type: 'quantifier', value: update})
    // })
    // firebase.database().ref(`/${uid}/live/builders/${2}/quantifier`).on('value', snapshot => {
    // const update = snapshot.val() ? snapshot.val() : ''
    // updateMb2({type: 'quantifier', value: update})
    // })
    // firebase.database().ref(`/${uid}/live/builders/${1}/number`).on('value', snapshot => {
    // const update = snapshot.val() ? snapshot.val() : ''
    // updateMb1({type: 'number', value: update})
    // })
    // firebase.database().ref(`/${uid}/live/builders/${2}/number`).on('value', snapshot => {
    // const update = snapshot.val() ? snapshot.val() : ''
    // updateMb2({type: 'number', value: update})
    // })
    return () => {
      firebase.database().ref(`/${uid}/live/builders/${1}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/predicate`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/names`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/quantifier`).off()
      firebase.database().ref(`/${uid}/live/builders/${1}/number`).off()
      firebase.database().ref(`/${uid}/live/builders/${2}/number`).off()
    }
  }, [uid])



  return (
    <>
      <div style={{marginTop: '25px', marginBottom: '25px'}}>
        <h3>ask a Question</h3>
        <label>who are you asking? </label>
        <select onChange={e => setAnswerer(e.target.value)}>
          <option value='' key={'empty'}>select a character...</option>
          {names.map(name => <option value={name} key={name}>{name}</option>)}
        </select>
      </div>
      <p style={{marginTop: 0}}>build your question:</p>
      <label>NOT</label>
      <input type='checkbox' onChange={() => setNegation(1)}/>
      <MiniBuilder
        key={1}
        i={1}
        names={names}
        uid={uid}
        setConjunct={setConjunct}
        updateSentence={updateMb1}
        sentence={mb1}
        />
      <select
        value={compoundSentence.c}
        onChange={e => {
          setCompound({...compoundSentence, c: e.target.value})
          liveUpdate({type: 'SELECTCONNECTIVE', connective: e.target.value, uid: uid})
        }}
        >
        <option value='' key={'empty'}>add a connective?</option>
        {connectives.map(connective => <option value={connective} key={connective}>{connective}</option>)}
      </select>
      {compoundSentence.c &&
        <div>
          <label>NOT</label>
          <input type='checkbox' onChange={() => setNegation(2)}/>
          <MiniBuilder
            key={2}
            i={2}
            names={names}
            uid={uid}
            setConjunct={setConjunct}
            updateSentence={updateMb2}
            sentence={mb2}
            />
        </div>
      }
      <button
        onClick={() => {
          updateGame({
            type: 'TAKETURN',
            turn: compoundSentence.c ? compoundSentence : compoundSentence[1],
            turnType: 'question',
            answerer: answerer
          })
          setCompound({1: '', 2: '', c: ''})
          liveUpdate({type: 'SELECTCONNECTIVE', connective: '', uid: uid})
          updateMb1({type: 'RESET'})
          updateMb2({type: 'RESET'})
        }}
      >
        ask!
      </button>
    </>
  )
}
