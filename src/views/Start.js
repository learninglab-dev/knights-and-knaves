import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Flex, Text, Heading, Button} from 'rebass'
import { Input } from '@rebass/forms'
import firebase from 'firebase'
import { DataReducer, Data } from '../data/GameData'
import About from './About'
import Popover, {ArrowContainer} from 'react-tiny-popover'


export default function Start() {
  const [id, setId] = useState(null)
  const [isPopover, setIsPopover] = useState(null)
  const [displayUid, setDisplayUid] = useState(false)
  const updateGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const history = useHistory()

  useEffect(() => {
    updateGame({type: 'RESET'})
  }, [updateGame])

  const createGame = () => {
    sessionStorage.removeItem('invalid')
    const id = Math.random().toString(36).substr(2, 6)
    updateGame({type: 'CREATE', uid: id})
    setDisplayUid(true)
  }
  const joinGame = () => {
    sessionStorage.removeItem('invalid')
    firebase.database().ref(`/${id}`).once('value').then(data => {
      if (data.val() === null) {
        sessionStorage.setItem('invalid', true)
        history.push('/null')
        return
      }
      return updateGame({type: 'JOIN', uid: id, solution: data.val().solution, turns: data.val().turns})
    })
  }

  return (
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%'
        }}>
        {sessionStorage.getItem('invalid') && <h3>invalid game id. please try again.</h3>}
        <Text
          sx={{
            width: '67%',
            fontFamily:'heading',
            color:'primary',
            fontSize: 'colossal',
            textAlign: 'center',
            mb:20
          }}
        >Knights & Knaves: A Logic Game</Text>
        <Flex
          sx={{
            flexDirection:'column',
            width: '33%'
          }}
        >
          {!displayUid &&
            <Flex
              sx={{
                flexDirection: 'column'
              }}>
              <Text sx={{fontFamily:'body',color:'text', fontSize:'medium', m:10}}>Create a new game:</Text>
              <Button variant='tertiary' onClick={() => createGame()} sx={{width: '50%', mb:10}}><Heading sx={{fontSize:'medium'}}>create</Heading></Button>
              <Text sx={{fontFamily:'body',color:'text', fontSize:'medium', m:10}}>Or join one in progress:</Text>
              <Flex sx={{flexDirection:'row', justifyContent:'flex-start', mb:10}}>
                <Input sx={{width: '50%', mr:20, bg:'white',fontFamily:'body', fontSize:'medium', color:'text',textTransform:'uppercase'}} id='gameId' name='gameId' type='text' placeholder='game id' onChange={e => setId(e.target.value)} ></Input>
                <Link to={!id ? `/` : `/${id}`}>
                  <Button variant='tertiary' onClick={() => joinGame()} sx={{width: '100%'}}><Heading sx={{fontSize:'medium'}}>join</Heading></Button>
                </Link>
              </Flex>
              <Popover
                isOpen={isPopover}
                position={'top'}
                padding={5}
                onClickOutside={e => setIsPopover(!isPopover)}
                transitionDuration={0.25}
                containerStyle={{width:'60%'}}
                content={({ position, targetRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    targetRect={targetRect}
                    popoverRect={popoverRect}
                    arrowColor={'#54345B'}
                    arrowSize={10}
                    style={{backgroundColor:'#54345B',marginBottom:10, padding:30}}
                  >
                  <About />
                  </ArrowContainer>
                )}
              >
                <Button variant='outline' onClick={() => setIsPopover(!isPopover)} sx={{m:10}}>
                  <Heading sx={{fontSize:'medium'}}>about this alpha</Heading>
                </Button>
              </Popover>
            </Flex>
          }
          {displayUid &&
            <Flex
              sx={{
              flexDirection: 'column',
              alignItems:'center',
              justifyContent:'center'
              }}>
              <Text sx={{fontFamily:'body',color:'text', m:10, textAlign:'center'}}>Here's your game id. send it to your teammates so they can join!
              <Heading sx={{m:10,fontSize:'large'}}>{gameData.uid}</Heading>
              Then click go! to start the game</Text>
              <Button variant='tertiary' onClick={() => {history.push(`/${gameData.uid}`)}}><Heading sx={{fontSize:'medium'}}>go!</Heading></Button>
            </Flex>
          }
        </Flex>

      </Flex>
  )
}
