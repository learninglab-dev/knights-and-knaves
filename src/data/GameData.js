import React, { useReducer, useEffect, useState } from 'react'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import gameDataReducer from './firebase'
import Router from '../Router'

export const Data = React.createContext()
export const DataReducer = React.createContext()


export default function GameData() {
  const [instance, setInstance] = useState(null)
  const initialData = {
    uid: '',
    solution: null,
    turns: [],
    startTime: '',
  }
  const [data, setData] = useReducer(gameDataReducer, initialData)

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    firebase.auth().onAuthStateChanged(() => {
      setInstance('ready')
    })
    return () => firebase.app().delete()
  }, [])

  return (
    <Data.Provider value={data}>
      <DataReducer.Provider value={setData}>
        <Router fbInstance={instance}/>
      </DataReducer.Provider>
    </Data.Provider>
  )
}
