import React, {
  useContext,
  useReducer
} from 'react'
import { Box, Flex } from 'rebass'
import Select from 'react-select'
import { DataReducer } from '../data/GameData'
import sentenceBuilder from '../utils/sentenceBuilder'


export default function MiniBuilder({names, answerer}) {
  const initialState = {
    disableNames: false,
    disableQuantifier: false,
    disableNumber: true,
    names: null,
    quantifier: null,
    number: null,
    predicate: null,
    connective: null,
  }
  const updateGame = useContext(DataReducer)
  const [sentence, updateSentence] = useReducer(sentenceBuilder, initialState)
  console.log(sentence.predicate)

  const numberOptions = names.map( (name, i) => {
    return {value: i+1, label: i+1}
    })
  const nameOptions = names.map( name => {
    return {value: name, label: name}
    })
  const quantifierOptions = [
                              {value: 'all', label: 'All'},
                              {value: 'some', label: 'Some'},
                              {value: 'none', label: 'None'},
                              {value: 'least', label: 'At least'},
                              {value: 'most', label: 'At most'},
                              {value: 'less', label: 'Less than'},
                              {value: 'more', label: 'More than'},
                            ]
  const predicateOptions =  [
                              {value: 'Knight', label: 'Knight'},
                              {value: 'Knave', label: 'is a Knave'},
                              {value: 'Dragon', label: 'is a Dragon'},
                              {value: 'Monk', label: 'is a Monk'},
                              {value: 'Same', label: 'are the Same'},
                              {value: 'Different', label: ' are Different'},
                            ]
  const connectiveOptions = [
                              {value: 'AND', label: 'And'},
                              {value: 'OR', label: 'Or'},
                              {value: 'NOT', label: 'Not'},
                              {value: 'IF', label: 'If'},
                              {value: 'IFF', label: 'If and only if'},
                            ]
  return (
    <Box>
      <Flex
        sx={{
          width:'100vw',
          flexDirection:'column'
        }}
      >
        <Select
          name='predicate'
          value={sentence.predicate ? {value: sentence.predicate, label: sentence.predicate} : null}
          isClearable={true}
          options={predicateOptions}
          onChange={(e) => {
            updateSentence({ type: 'predicate', value: e.value })
            updateSentence({type: 'ORACLESPEAK'})
          }}
        />
        {!sentence.disableNames &&
            <Select
            name='names'
            value={sentence.names ? sentence.names.map(name => ({value: name, label: name})) : []}
            isDisabled={sentence.disableNames}
            isMulti
            options={nameOptions}
            onChange={(e) => {
              updateSentence({ type: 'names', value: e ? e : [] })
              updateSentence({type: 'ORACLESPEAK'})
            }}
            styles={{
              width:'500px',
            }}
          />
        }
        {!sentence.disableQuantifier &&
          <Select
            name='quantifier'
            value={sentence.quantifier ? {value: sentence.quantifier, label: sentence.quantifier} : null}
            defaultValue={null}
            isDisabled={sentence.disableQuantifier}
            isClearable={true}
            options={quantifierOptions}
            onChange={(e) => {
              updateSentence({ type: 'quantifier', value: e ? e.value : null })
              updateSentence({type: 'ORACLESPEAK'})
            }}
          />
        }
        {!sentence.disableNumber &&
          <Select
            name='number'
            value={sentence.number ? {value: sentence.number, label: sentence.number} : null}
            defaultValue={null}
            isDisabled={sentence.disableNumber}
            isClearable={true}
            options={numberOptions}
            onChange={(e) => {
              updateSentence({ type: 'number', value: e ? e.value : null })
              updateSentence({type: 'ORACLESPEAK'})
            }}
          />
        }
      </Flex>
      {false && <Select
        name='connective'
        defaultValue = {null}
        isClearable={true}
        options={connectiveOptions}
        onChange={(e) => updateSentence({ type: 'connective', value: e ? e.value : null })}
      />}
    <p>{sentence.predicate} {sentence.names} {sentence.quantifier} {sentence.number}</p>
    <button
      onClick={() => {
        updateGame({type: 'TAKETURN', turn: sentence.oracleSpeak, turnType: 'question', answerer: answerer})
        updateSentence({type: 'RESET'})
      }}
    >
      submit turn
    </button>
  </Box>
  )
}
