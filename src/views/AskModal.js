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
      <Button variant='invisible' onClick={setAnswerer} sx={{display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
        <Heading sx={{fontSize:'large',textShadow:' -0.4vmin 0 black, 0 0.4vmin black, 0.4vmin 0 black, 0 -0.4vmin black'}}>{name}</Heading>
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
          height:'70vh',
          position:'absolute',
          left:0,right:0,bottom:0,top:'30vh',
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

          <Box sx={{mt:40, mx:30, mt:'5vh', flexBasis:'50%', height:'90%'}}><Ask answerer={name} /></Box>
          <Flex sx={{flexDirection:'column',alignItems:'center', mx:10, mt:'5vh', flexBasis:'15%'}}>
            <Heading sx={{fontSize:'huge', color:'lightblue'}}>{name}</Heading>
            <Character type='mystery' grey={false}/>
          </Flex>
          <Flex sx={{mt:40, mt:'5vh', flexBasis:'40%',flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
            <Heading sx={{color:'secondary', fontSize:'medium', mb:3}}>responses:</Heading>
            <History turns={data.turns} name={name}/>
          </Flex>
        </Flex>
      }
    </>
  )
}
