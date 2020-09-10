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
import {Box, Heading} from 'rebass'
import theme from './theme'
import Start from './views/Start'
import Interface from './views/Interface'
import CharacterBuilder from './views/CharacterBuilder'
import { Data, DataReducer } from './data/GameData'
import Bug from './views/Bug'
import Frame from './views/Frame'
import island from './assets/island.png'

export default function Routes({ fbInstance }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{height: '100vh', width: '100vw', backgroundImage: `url(${island})`, backgroundSize: 'cover', backgroundPosition:'center center'}}>
        <Frame>
          <Router>
            <Switch>
              <Route exact path='/'>
                <Start />
              </Route>
              <Route exact path='/:id'>
                <ValidateGameId fbInstance={fbInstance}/>
              </Route>
            </Switch>
          </Router>
        </Frame>
        <Bug />
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
      return <Heading sx={{fontSize:40}}>Loading...</Heading>
    case 'invalid':
      return <Redirect to='/' />
    case 'characters':
      return <CharacterBuilder />
    case 'ready':
      return <Interface />
    default:
      return alert('sorry! we are having trouble loading your game')
  }
}
