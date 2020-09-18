import React, {useContext} from 'react'
import {Flex, Box, Heading, Button, Text, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'
import { Data } from '../data/GameData'
import Character from './Character'
import Ask from './Ask'
import History from './History'
import close from '../assets/close.svg'

export default function AskModal({name, show, setAnswerer, setShow, data, input}) {
  const solution = data.solution
  const solved = data.solved
  return (
    <>
      <Button variant='invisible' onClick={setAnswerer} sx={{display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
        <Heading sx={{fontSize:'large',textShadow:' -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black'}}>{name}</Heading>
        <Character type={ solved ? solution[name] : input[name] ? input[name] : 'mystery'} grey={!solved}/>
      </Button>
      {show &&
        <Flex sx={{
          bg:'primary',
          opacity:'100%',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'flex-start',
          py:20,
          pl:20,
          width:'100vw',
          height:'75vh',
          position:'absolute',
          left:0,right:0,bottom:0,top:'25vh',
          zIndex:'10'}}>
          <Button
            variant='invisible'
            sx={{
              height:'auto',
            }}
            onClick={setShow}
          >
            <Image src={close} alt='close' sx={{width:20}}/>
          </Button>
          <Flex sx={{flexDirection:'column',alignItems:'center', mx:10, mt:'5vh', flexBasis:'15%'}}>
            <Heading sx={{fontSize:'huge', color:'lightblue'}}>{name}</Heading>
            <Character type='mystery' grey={false}/>
          </Flex>
          <Box sx={{mt:40, mx:30, mt:'5vh', flexBasis:'40%'}}><Ask answerer={name} /></Box>
          <Box sx={{mt:40, mt:'5vh', flexBasis:'40%'}}><History turns={data.turns} name={name}/></Box>
        </Flex>
      }
    </>
  )
}
