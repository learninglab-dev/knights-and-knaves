import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect
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

// TODO: add a test in here to see if the user has hit refresh on '/:id' and reinitialize firebase or move the initalize function into router?

function ValidateGameId() {
  const { id } = useParams()
  const [snapshot, setSnapshot] = useState('loading')
  useEffect(() => {
    firebase.database().ref(`/${id}`).once('value').then(data => {
      if (data.val() === null) {
        sessionStorage.setItem('invalid', true)
      }
      setSnapshot(data.val())
    })
  }, [id])
  switch (snapshot) {
    case 'loading':
      return <h2>Loading...</h2>
    case null:
      return <Redirect to='/' />
    default:
      return <Play />
  }
}
