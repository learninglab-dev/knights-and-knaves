import React, {
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming';
import firebase from 'firebase'
import {Box, Flex, Heading} from 'rebass'
import theme from './theme'
import Start from './views/Start'
import Lineup from './views/Lineup'
import CharacterBuilder from './views/CharacterBuilder'
import { Data, DataReducer } from './data/GameData'
import Frame from './views/Frame'
import island from './assets/island.png'

export default function Routes({ fbInstance }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{height: '100vh', width: '100vw', backgroundImage: `url(${island})`, backgroundSize: 'cover', backgroundPosition:'center center'}}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Frame>
                <Start />
              </Frame>
            </Route>
            <Route exact path='/:id'>
              <ValidateGameId fbInstance={fbInstance}/>
            </Route>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  )
}


function ValidateGameId({ fbInstance }) {
  const { id } = useParams()
  const uid = useContext(Data).uid
  const solution = useContext(Data).solution
  const updateGame = useCallback(useContext(DataReducer), [])
  const [status, setStatus] = useState(uid ? 'characters' : 'loading')
  useEffect(() => {
    if (solution) {
      setStatus('ready')
    }
    if (uid && !solution) {
      setStatus('characters')
    }
  },[solution, uid])
  useEffect(() => {
    if (!uid && fbInstance) {
      firebase.database().ref(`/${id}`).once('value').then(data => {
        if (data.val() === null) {
          sessionStorage.setItem('invalid', true)
          return setStatus('invalid')
        }
        updateGame({type: 'JOIN', uid: id, solution: data.val().solution, turns: data.val().turns})
      })
    }
  }, [uid, id, updateGame, fbInstance])
  switch (status) {
    case 'loading':
      return <Flex sx={{flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%'}}><Heading sx={{fontSize:'huge',color:'primary'}}>Loading...</Heading></Flex>
    case 'invalid':
      return <Redirect to='/' />
    case 'characters':
      return (
        <Frame>
          <CharacterBuilder />
        </Frame>
      )
    case 'ready':
      return (
        <Frame>
          <Lineup />
        </Frame>
      )
    default:
      return alert('Sorry! we are having trouble loading your game.')
  }
}
