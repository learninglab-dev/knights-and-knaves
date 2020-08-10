import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect,
} from 'react-router-dom'
import firebase from 'firebase'
import Start from './Start'
import Play from './Play'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div>
            <Start />
          </div>
        </Route>
        <Route exact path='/:id'>
          <ValidateGameId />
        </Route>
      </Switch>
    </Router>
  )
}


function ValidateGameId() {
  const { id } = useParams()
  const [snapshot, setSnapshot] = useState('init')
  useEffect(() => {
    if (firebase.apps.length === 0) {
      setSnapshot('loading')
    } else {
      firebase.database().ref(`/${id}`).once('value').then(data => {
        if (data.val() === null) {
          sessionStorage.setItem('invalid', true)
        }
        setSnapshot(data.val())
      })
    }
  },[id, snapshot])
  switch (snapshot) {
    case 'loading':
    case 'init':
      return <h2>Loading...</h2>
    case null:
      return <Redirect to='/' />
    default:
      return <Play />
  }
}
