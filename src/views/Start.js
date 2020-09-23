import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Flex, Text, Heading, Link as Alink, Button} from 'rebass'
import { Input } from '@rebass/forms'
import firebase from 'firebase'
import { DataReducer, Data } from '../data/GameData'
import About from './About'

const vidLink = 'https://youtu.be/3uXis5-y5x8'
const wikiLink = 'https://en.wikipedia.org/wiki/Knights_and_Knaves'

const A = props =>
  <Alink
   {...props}
   target="_blank"
   rel="noopener noreferrer"
   sx={{
     fontWeight:'700',
     color:'darkgreen',
     textDecoration:'none'
   }}
  />


export default function Start() {
  const [id, setId] = useState(null)
  const [displayUid, setDisplayUid] = useState(false)
  const updateGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const history = useHistory()

  // QUESTION: what was the purpose of this? something about enabling going back to start?
  // useEffect(() => {
  //   updateGame({type: 'RESET'})
  // }, [updateGame])

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
          flexDirection:'row',
          justifyContent:'space-evenly',
          width: '100%',
          height:'100%'
        }}
      >
        <Text
          sx={{fontFamily:'body',color:'foreground', fontSize:'tiny', mx:20, mb:10, width:'60%',overflow:'auto',maxHeight:'30vh'}}
        >
          <p>Welcome to the island of Knights, Knaves, Monks, & Dragons!</p>
          <p><A href={wikiLink}>Knights & Knaves</A> puzzles are a type of logic puzzle in which you encounter a group of the island's inhabitants, and you must deduce their identities from their statements.</p>
          <p>There are four islander identities: Knights, Knaves, Monks, and Dragons. Knights always tell the truth; Knaves always lie; Dragons tell the truth except in the presence of a Knight; and Monks say whatever they like.</p>
          <p>In this game version we invert the usual roles. Instead of the islanders speaking to you, you and your team will question the islanders. For a walkthrough of the game interface, check out our <A href={vidLink}>How to Play</A> video.</p>
        </Text>

          <Flex sx={{flexDirection:'column', justifyContent:'center', width:'20%', my:10}}>
            {!displayUid &&
              <>
                <A href={vidLink}>
                  <Button variant='outline' sx={{width:'100%', mb:3}}>
                    <Heading sx={{fontSize:'medium'}}>tutorial</Heading>
                  </Button>
                </A>
                <Button variant='tertiary' onClick={() => createGame()} sx={{mb:3}}><Heading sx={{fontSize:'medium'}}>create game</Heading></Button>
                <Flex sx={{flexDirection:'row', justifyContent:'flex-start', mb:10}}>
                  <Input sx={{
                    mr:20, bg:'white',fontFamily:'body', fontSize:'small', fontWeight:'bold',
                    textTransform:'uppercase',textAlign:'center',
                    backgroundColor: sessionStorage.getItem('invalid') ? 'lightred' : 'foreground',
                    color: sessionStorage.getItem('invalid') ? 'darkred' : 'text',
                  }} id='gameId' name='gameId' type='text' placeholder={sessionStorage.getItem('invalid') ? 'invalid id' : 'game id'} onChange={e => setId(e.target.value)} ></Input>
                  { id &&
                    <Link to={!id ? `/` : `/${id}`}>
                      <Button variant='tertiary' onClick={() => joinGame()} sx={{}}><Heading sx={{fontSize:'medium'}}>join</Heading></Button>
                    </Link>
                  }
                  { !id &&
                    <Link>
                      <Button variant='nope'>
                        <Heading sx={{fontSize:'medium'}}>join</Heading>
                      </Button>
                    </Link>
                  }
                </Flex>
              </>
            }
            {displayUid &&
              <>
                <Text sx={{fontFamily:'body',color:'foreground', fontSize:'small', textAlign:'center'}}>Share this game ID with your teammates so they can join!</Text>
                <Heading sx={{fontSize:'large',color:'secondary',textAlign:'center', mb:3}}>{gameData.uid}</Heading>
                <Button variant='tertiary' onClick={() => {history.push(`/${gameData.uid}`)}}><Heading sx={{fontSize:'medium'}}>go!</Heading></Button>
              </>
            }
          </Flex>
      </Flex>
  )
}
