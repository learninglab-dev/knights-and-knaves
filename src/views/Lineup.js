import React, { useContext, useState } from 'react'
import {Flex, Heading} from 'rebass'
import { Data } from '../data/GameData'
import Character from './Character'
import AskModal from './AskModal'

export default function Lineup() {
  const gameData = useContext(Data)
  const names = Object.keys(gameData.solution)
  const [modalState, setModalState] = useState(Object.fromEntries(names.map(name => [name, false])))
  console.log(JSON.stringify(modalState, null, 2))

  const toggleModals = (target) => {
    const update = Object.keys(modalState).map(name => {
      if (name === target) {
        return [name, true]
      }
      return [name, false]
    })
    return Object.fromEntries(update)
  }

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
          <AskModal name={name} show={modalState[name]} setShow={() => setModalState(toggleModals(name))}/>
        </Character>)}
    </Flex>
  )
}
