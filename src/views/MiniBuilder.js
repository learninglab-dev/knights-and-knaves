import React from 'react'
import { Box, Flex, Heading, Text } from 'rebass'
import Select from 'react-select'
import liveUpdate from '../utils/live'
import { englishify } from '../utils/englishify'
import { predicateOptions, quantifierOptions } from '../utils/select-options'


export default function MiniBuilder(props) {
  const {
    names,
    i,
    uid,
    updateSentence,
    sentence
  } = props

  const numberOptions = names.map( (name, i) => {
    return {value: i+1, label: i+1}
    })
  const nameOptions = names.map( name => {
    return {value: name, label: name}
    })

  return (
      <Flex
        sx={{
          width:'100%',
          flexDirection:'column'
        }}
      >
        <Select
          name='predicate'
          value={sentence.predicate ? {value: sentence.predicate, label: predicateOptions.find(option => option.value === sentence.predicate).label} : null}
          isClearable={true}
          placeholder="Predicate..."
          options={predicateOptions}
          closeMenuOnSelect={false}
          onChange={(e) => {
            updateSentence({ type: 'predicate', value: e ? e.value : '' })
            liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'predicate', value: e ? e.value : ''})
          }}
        />
        {!sentence.disableNames &&
            <Select
            name='names'
            value={sentence.names ? sentence.names.map(name => ({value: name, label: name})) : []}
            isDisabled={sentence.disableNames}
            placeholder="Names..."
            closeMenuOnSelect={false}
            blurInputOnSelect={false}
            isMulti
            options={nameOptions}
            onChange={(e) => {
              updateSentence({type: 'names', value: e ? e : [] })
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
            value={sentence.quantifier ? {value: sentence.quantifier, label: quantifierOptions.find(option => option.value === sentence.quantifier).label} : null}
            defaultValue={null}
            isDisabled={sentence.disableQuantifier}
            placeholder="OR Quantifier..."
            isClearable={true}
            options={quantifierOptions}
            closeMenuOnSelect={false}
            onChange={(e) => {
              updateSentence({type: 'quantifier', value: e ? e.value : '' })
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
            closeMenuOnSelect={false}
            onChange={(e) => {
              updateSentence({ type: 'number', value: e ? e.value : '' })
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'number', value: e ? e.value : ''})
            }}
          />
        }
      </Flex>
  )
}
