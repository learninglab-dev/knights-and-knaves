import React from 'react'
import { Box, Flex, Heading, Text } from 'rebass'
import Select from 'react-select'
import liveUpdate from '../utils/live'


const quantifierOptions = [
                            {value: 'all', label: 'all'},
                            {value: 'some', label: 'some'},
                            {value: 'none', label: 'none'},
                            {value: 'least', label: 'least'},
                            {value: 'most', label: 'most'},
                            {value: 'less', label: 'less'},
                            {value: 'more', label: 'more'},
                          ]
const predicateOptions =  [
                            {value: 'Knight', label: 'Knight'},
                            {value: 'Knave', label: 'Knave'},
                            {value: 'Dragon', label: 'Dragon'},
                            {value: 'Monk', label: 'Monk'},
                            {value: 'Same', label: 'Same'},
                            {value: 'Different', label: 'Different'},
                          ]



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
            value={sentence.quantifier ? {value: sentence.quantifier, label: sentence.quantifier} : null}
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
    <Heading sx={{fontFamily:'heading',color:'foreground',fontSize:'medium', my:20}}>
      Is it true that {englishify(sentence)}?
    </Heading>
  </Box>
  )
}

const englishify = sentence => {
  const subject = sentence.names ?
    sentence.names.length > 1 ?
      sentence.names.map((name, i) => {
        if (i+1 < sentence.names.length) {
          return `${name} and `
        }
        return name
      }) :
    sentence.names :
    quantifierOptions.map(option => {
      if (option.value === sentence.quantifier) {
        return `${option.label} ${sentence.number ? sentence.number : ''} of you`
      }
      return ''
    })
  const plural = sentence?.names ?
    sentence.names.length === 1 ? 'is a' : 'are' :
    sentence.number ? sentence.number > 1 ? 'are' : 'is a' :
    sentence.quantifier === 'all' || sentence.quantifier === 'some' ? 'are' :
    sentence.quantifier ? 'is a' : null
  const predicate = plural === 'are' ? `${plural} ${sentence.predicate}s` : ` ${plural} ${sentence.predicate}`
  return `${subject.join('')} ${predicate}`
}
