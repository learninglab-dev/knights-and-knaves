import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import {Flex, Heading} from 'rebass'
import firebase from 'firebase'
import { Data } from '../data/GameData'
import Character from './Character'
import AskModal from './AskModal'
import liveUpdate from '../utils/live'


export default function Lineup() {
  const gameData = useContext(Data)
  const uid = gameData.uid
  const names = useMemo(() => Object.keys(gameData.solution), [gameData.solution])
  const [modalState, setModalState] = useState(Object.fromEntries(names.map(name => [name, false])))

  const toggleModals = useCallback((target) => {
    const update = names.map(name => {
      if (name === target) {
        return [name, true]
      }
      return [name, false]
    })
    return Object.fromEntries(update)
  }, [names])

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/answerer`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setModalState(toggleModals(update))
    })
    return () => firebase.database().ref(`/${uid}/live/answerer`).off()
  }, [uid, toggleModals])

  return (
    <Flex
      sx={{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
      }}>
      {names.map(name =>
        <Character type='mystery'>
          <AskModal name={name} show={modalState[name]} setShow={() => liveUpdate({type: 'ANSWERER', uid: uid, answerer: name})}/>
        </Character>)}
    </Flex>
  )
}
