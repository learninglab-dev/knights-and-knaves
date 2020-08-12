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
import firebase from 'firebase'
import Start from './views/Start'
import Interface from './views/Interface'
import CharacterBuilder from './views/CharacterBuilder'
import { Data, DataReducer } from './data/GameData'


export default function Routes({ fbInstance }) {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div>
            <Start />
          </div>
        </Route>
        <Route exact path='/:id'>
          <ValidateGameId fbInstance={fbInstance}/>
        </Route>
      </Switch>
    </Router>
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
      return <h2>Loading...</h2>
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
