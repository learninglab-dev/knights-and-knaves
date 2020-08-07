import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Start from './Start'
import Play from './Play'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Start />
        </Route>
        <Route exact path='/:id'>
          <Play />
        </Route>
      </Switch>
    </Router>
  )
}

// QUESTION: do we want to validate game ids as part of the routing and then send the user to / if it doesn't exist?
