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
  const plural = sentence.names ?
    sentence.names.length === 1 ? 'is a' : 'are' :
    sentence.number ? sentence.number > 1 ? 'are' : 'is a' :
    sentence.quantifier ? 'is a' : null

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
                              {value: 'least', label: 'At least '},
                              {value: 'most', label: 'At most '},
                              {value: 'less', label: 'Less than '},
                              {value: 'more', label: 'More than '},
                            ]
  const predicateOptions =  [
                              {value: 'Knight', label: 'Knight'},
                              {value: 'Knave', label: 'Knave'},
                              {value: 'Dragon', label: 'Dragon'},
                              {value: 'Monk', label: 'Monk'},
                              {value: 'Same', label: 'Same'},
                              {value: 'Different', label: 'Different'},
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
          width:'40vw',
          flexDirection:'column'
        }}
      >
        <p style={{marginTop: 0}}>build your question:</p>
        <Select
          name='predicate'
          value={sentence.predicate ? {value: sentence.predicate, label: sentence.predicate} : null}
          isClearable={true}
          placeholder="Predicate..."
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
            placeholder="Names..."
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
            placeholder="OR Quantifier..."
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
    <p style={{fontWeight: 'bold'}}>
      {sentence.names?.length > 1 ? sentence.names.map((name, i) => {
        if (i+1 < sentence.names.length) {
          return `${name} and `
        }
        return name
      }) : sentence.names}
      { quantifierOptions.map(option => {
        if (option.value === sentence.quantifier) {
          return option.label
        }
        return ''
      })
      }
      {sentence.number} {plural} {sentence.predicate}?
    </p>
    <button
      onClick={() => {
        updateGame({type: 'TAKETURN', turn: sentence.oracleSpeak, turnType: 'question', answerer: answerer})
        updateSentence({type: 'RESET'})
      }}
    >
      ask!
    </button>
  </Box>
  )
}
