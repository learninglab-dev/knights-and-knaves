import React, { useContext } from 'react'
import {Flex, Heading} from 'rebass'
import { Data } from '../data/GameData'
import Character from './Character'
import AskModal from './AskModal'

export default function Lineup() {
  const gameData = useContext(Data)
  const names = Object.keys(gameData.solution)

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
          <AskModal name={name}/>
        </Character>)}
    </Flex>
  )
}
