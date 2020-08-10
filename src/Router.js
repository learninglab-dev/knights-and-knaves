import React, { useState, useEffect, useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Redirect,
} from 'react-router-dom'
import firebase from 'firebase'
import Start from './Start'
import Interface from './Interface'
import CharacterBuilder from './CharacterBuilder'
import { Data, DataReducer } from './data/GameData'


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
  const gameData = useContext(Data)
  console.log(Promise.resolve(gameData))
  const updateGame = useContext(DataReducer)
  const [snapshot, setSnapshot] = useState('init')
  useEffect(() => {
    if (firebase.apps.length === 0) {
      setSnapshot('loading')
    } else {
      firebase.database().ref(`/${id}`).once('value').then(data => {
        if (data.val() === null) {
          sessionStorage.setItem('invalid', true)
          return setSnapshot(null)
        }
        if (!gameData.uid) {
          updateGame({type: 'JOIN', uid: id, solution: data.val().solution, turns: data.val().turns})
        }
        return setSnapshot('exists')
      })
    }
  },[id, snapshot, gameData.uid, updateGame])
  switch (snapshot) {
    case 'loading':
    case 'init':
      return <h2>Loading...</h2>
    case null:
      return <Redirect to='/' />
    default:
      return (
        <>
        { gameData.solution ?
          <Interface /> :
          <CharacterBuilder />
        }
      </>
    )
  }
}
