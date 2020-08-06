import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Start from './setup/Start'
import Create from './setup/Create'
import Join from './setup/Join'
import Game from './gameplay/Game'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Start />
        </Route>
        <Route exact path='/create'>
          <Create />
        </Route>
        <Route exact path='/create/:id'>
          <Create />
        </Route>
        <Route exact path='/join'>
          <Join />
        </Route>
        <Route path='/join/:id'>
          <Join />
        </Route>
        <Route exact path='/play/:id'>
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}

// QUESTION: do we want to validate game ids as part of the routing and then send the user to /create if it doesn't exist?
