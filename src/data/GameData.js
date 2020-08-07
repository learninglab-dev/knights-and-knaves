import React, { useReducer, useEffect } from 'react'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import gameDataReducer from './firebase'
import Router from '../Router'

export const Data = React.createContext()
export const DataReducer = React.createContext()


export default function GameData() {
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
  }, [])

  return (
    <Data.Provider value={data}>
      <DataReducer.Provider value={setData}>
        <Router />
      </DataReducer.Provider>
    </Data.Provider>
  )
}
