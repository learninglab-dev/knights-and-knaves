import React from 'react'
import ReactDOM from 'react-dom'
import GameData from './data/GameData'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <GameData />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
