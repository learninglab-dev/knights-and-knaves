import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'
import { Flex, Button, Heading } from 'rebass'
import { Select } from '@rebass/forms'
import firebase from 'firebase'
import { Data, DataReducer } from '../data/GameData'
import Character from './Character'
import AskModal from './AskModal'
import { englishifySolve } from '../utils/englishify'
import liveUpdate from '../utils/live'


export default function Lineup() {
  const updateGame = useContext(DataReducer)
  const gameData = useContext(Data)
  const solution = gameData.solution
  const solved = gameData.solved
  const uid = gameData.uid
  const names = useMemo(() => Object.keys(solution), [solution])
  const [modalState, setModalState] = useState(Object.fromEntries(names.map(name => [name, false])))
  const [input, setInput] = useState(Object.fromEntries(names.map(name => [name, ''])))

  const toggleModals = useCallback((target) => {
    const update = names.map(name => {
      if (name === target) {
        return [name, true]
      }
      return [name, false]
    })
    // liveUpdate({type: 'CLEAR_ANSWERER', uid: uid})
    liveUpdate({type: 'CLEAR_BUILDERS', uid: uid})
    return Object.fromEntries(update)
  }, [names, uid])

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/answerer`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : ''
    setModalState(toggleModals(update))
    })
    return () => firebase.database().ref(`/${uid}/live/answerer`).off()
  }, [uid, toggleModals])

  useEffect(() => {
    firebase.database().ref(`/${uid}/live/roles`).on('value', snapshot => {
    const update = snapshot.val() ? snapshot.val() : Object.fromEntries(names.map(name => [name, '']))
    setInput(update)
    })
    return () => firebase.database().ref(`/${uid}/live/roles`).off()
  }, [uid, names])


  return (
    <Flex sx={{flexDirection:'column',alignItems:'center'}}>
      <Flex
        sx={{
          width:'100%',
          flexDirection:'row',
          flexWrap:'wrap',
          justifyContent:'space-evenly',
        }}>
        {names.map(name =>
          <Flex sx={{flexDirection:'column',alignItems:'center'}} key={name}>
            <Character type={ solved ? solution[name] : input[name] ? input[name] : 'mystery'} grey={!solved} >
              <Flex sx={{flexDirection:'column',alignItems:'center', justifyContent:'space-between',height:'100%',pb:50, pt:0}}>
                <AskModal name={name} show={modalState[name]} setAnswerer={() => liveUpdate({type: 'ANSWERER', uid: uid, answerer: name})} setShow={()=>liveUpdate({type: 'ANSWERER', uid: uid, answerer: 'CLEAR'})}/>
                <Select
                  sx={{
                    mb:10,
                    bg:'white',
                    fontFamily:'body',
                    color:'text',
                    textAlign:'left',
                    fontSize:'tiny',
                    width: 100,
                    pl:15
                  }}
                  value={input[name]}
                  onChange={e => {
                    setInput({...input, [name]: e.target.value})
                    liveUpdate({type: 'ROLES', uid: uid, name: name, role: e.target.value})
                  }}
                  >
                  <option value="" defaultValue>is a...</option>
                  <option value="K">Knight</option>
                  <option value="N">Knave</option>
                  <option value="D">Dragon</option>
                  <option value="M">Monk</option>
                </Select>
              </Flex>
            </Character>
          </Flex>
        )}
      </Flex>
      <Button
        variant='tertiary'
        sx={{m:10}}
        onClick={() => {
          updateGame({type: 'TAKETURN', turn: input, turnType: 'solve', english: englishifySolve(input)})
          liveUpdate({type: 'RESET', uid: uid})
          setInput(Object.fromEntries(names.map(name => [name, ''])))
        }}
        style={{marginTop: '15px'}}
        >
        <Heading sx={{fontSize:'medium'}}>attempt to solve</Heading>
      </Button>
    </Flex>
  )
}
