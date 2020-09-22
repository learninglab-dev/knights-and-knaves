import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import { Box } from 'rebass'
import firebase from 'firebase'
import { Data, DataReducer } from '../data/GameData'
import Bug from './Bug'
import Credits from './Credits'
import Oracle from './Oracle'
import { useParams } from 'react-router-dom'


export default function Frame({children, status}) {
  const gameData = useContext(Data)
  const updateGame = useContext(DataReducer)
  const [oracleController, setOracle] = useState({
    visible: true,
    tab: '',
    content: 'start',
    newResponse: false
  })
  const go = useParams().id

  useEffect(() => {
    if (gameData.uid) {
      firebase.database().ref(`/${gameData.uid}/turns`).on('value', snapshot => {
        const update = snapshot.val()
        updateGame({type: 'GETTURNS', turns: update})
        if (update) {
          setOracle(oracleController => {return {...oracleController, visible: true, tab: 'one', newResponse: true}})
        }
      })
      return () => firebase.database().ref(`/${gameData.uid}/solution`).off()
    }
  }, [updateGame, gameData.uid])
  useEffect(() => {
    if (gameData.uid) {
      firebase.database().ref(`/${gameData.uid}/solved`).on('value', snapshot => {
        if (snapshot.val()) {
          updateGame({type: 'SOLVED'})
          setOracle(oracleController => {return{...oracleController, visible: true, tab: 'one', newResponse: true, content: 'solved'}})
        }
      })
      return () => firebase.database().ref(`/${gameData.uid}/solved`).off()
    }
  }, [gameData.uid, updateGame])
  useEffect(() => {
    if (gameData.uid && !gameData.solution && !gameData.creator) {
      setOracle(oracleController => {return {...oracleController, visible: true, content: 'naming'}})
    } else if (gameData.uid && !gameData.solution && gameData.creator && go) {
      setOracle(oracleController => {return {...oracleController, visible: true, content: 'naming'}})
    } else if (gameData.uid && gameData.solution) {
      setOracle(oracleController => {return {...oracleController, visible: true, content: 'play', tab: 'two'}})
    }
  }, [gameData, go])

  return (
    <Box
      sx={{
        display:'grid',
        height:'100%',
        width:'100%',
        gridTemplateColumns: '1fr 5fr 1fr',
        gridTemplateRows: '3fr 6fr 1fr',
      }}
    >
      <Box sx={{gridColumn:'2/span 1', gridRow:'2/span 1'}}>{children}</Box>
      <Box sx={{gridColumn:'1/span 3', gridRow:'1/span 1', zIndex:'30'}}>
        <Oracle
          controller={oracleController}
          setOracle={() => setOracle({...oracleController, visible: !oracleController.visible})}
          setTab={tab => setOracle({...oracleController, tab: tab})}
          />
      </Box>
      <Box sx={{gridColumn:'1/span 1', gridRow:'3/span 1', placeSelf:'center end'}}><Credits/></Box>
      <Box sx={{gridColumn:'3/span 1', gridRow:'3/span 1', placeSelf:'center start'}}><Bug/></Box>
    </Box>
  )
}
