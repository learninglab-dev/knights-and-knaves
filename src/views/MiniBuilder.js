import React, { useReducer, useContext, useEffect } from 'react'
import { Box, Flex } from 'rebass'
import Select from 'react-select'
import firebase from 'firebase'
import sentenceBuilder from '../utils/sentenceBuilder'
import { LiveReducer } from '../data/GameData'


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


export default function MiniBuilder(props) {
  const {
    names,
    setConjunct,
    i,
    uid,
    updateSentence,
    sentence
  } = props
  const liveUpdate = useContext(LiveReducer)

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

  return (
    <Box>
      <Flex
        sx={{
          width:'40vw',
          flexDirection:'column'
        }}
      >
        <Select
          name='predicate'
          value={sentence.predicate ? {value: sentence.predicate, label: sentence.predicate} : null}
          isClearable={true}
          placeholder="Predicate..."
          options={predicateOptions}
          onChange={(e) => {
            updateSentence({ type: 'predicate', value: e ? e.value : '' })
            updateSentence({type: 'ORACLESPEAK', setConjunct: setConjunct, i: i})
            liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'predicate', value: e ? e.value : ''})
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
              updateSentence({type: 'ORACLESPEAK', setConjunct: setConjunct, i: i})
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'names', value: e ? e : []})
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
              updateSentence({type: 'ORACLESPEAK', setConjunct: setConjunct, i: i})
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'quantifier', value: e ? e.value : ''})
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
              updateSentence({type: 'ORACLESPEAK', setConjunct: setConjunct, i: i})
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'number', value: e ? e.value : ''})
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
  </Box>
  )
}
