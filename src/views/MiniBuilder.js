import React from 'react'
import { Box, Flex, Heading, Text } from 'rebass'
import Select from 'react-select'
import liveUpdate from '../utils/live'
import { englishify } from '../utils/englishify'
import { predicateOptions, quantifierOptions } from '../utils/select-options'


const customStyles = {
  control: (styles) => ({
     ...styles,
     backgroundColor: 'transparent',
     borderRadius:0,
     borderWidth:'0px 0px 3px 0px',
     borderColor:'#F58B00',
   }),
   menu: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      borderRadius:0,
      borderWidth:0,
      borderColor:'transparent',
      margin:0,
      padding:0
    }),

  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? '#DE640B'
        : isFocused
        ? '#F5C00C'
        : '#F58B00',
      color: '#3D2642',
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 'bold',
      ':active': {
        backgroundColor: '#5FB923'
      },
    };
  },

  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#F58B00',
      backgroundColor: 'transparent',
      borderRadius:0,
      borderWidth:3,
      borderColor:'#F58B00'
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#F58B00',
    fontFamily: '"Nunito", sans-serif',
    fontWeight: 'bold',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#C497CF',
    fontFamily: '"Nunito", sans-serif',
    fontWeight: 'bold',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#F58B00',
    fontFamily: '"Nunito", sans-serif',
    fontWeight: 'bold',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#F58B00',
    ':hover': {
      color: '#5FB923',
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    ':hover': {
      color: '#5FB923',
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    ':hover': {
      color: '#5FB923',
    },
  }),
};

export default function MiniBuilder(props) {
  const {
    names,
    i,
    uid,
    updateSentence,
    sentence,
    answerer
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
          styles={customStyles}
          name='predicate'
          value={sentence.predicate ? {value: sentence.predicate, label: predicateOptions.find(option => option.value === sentence.predicate).label} : null}
          isClearable={true}
          placeholder="Predicate..."
          options={predicateOptions}
          closeMenuOnSelect={true}
          onChange={(e) => {
            // updateSentence({ type: 'predicate', value: e ? e.value : '' })
            liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'predicate', answerer: answerer, value: e ? e.value : ''})
          }}
        />
        {!sentence.disableNames &&
            <Select
            styles={customStyles}
            name='names'
            value={sentence.names ? sentence.names.map(name => ({value: name, label: name})) : []}
            isDisabled={sentence.disableNames}
            placeholder="Select 1 or more names..."
            closeMenuOnSelect={true}
            isMulti
            options={nameOptions}
            onChange={(e) => {
              // updateSentence({type: 'names', value: e ? e : [] })
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'names', answerer: answerer, value: e ? e : []})
            }}
          />
        }
        {!sentence.disableQuantifier &&
          <Select
            styles={customStyles}
            name='quantifier'
            value={sentence.quantifier ? {value: sentence.quantifier, label: quantifierOptions.find(option => option.value === sentence.quantifier).label} : null}
            defaultValue={null}
            isDisabled={sentence.disableQuantifier}
            placeholder="OR Quantifier..."
            isClearable={true}
            options={quantifierOptions}
            closeMenuOnSelect={true}
            onChange={(e) => {
              // updateSentence({type: 'quantifier', value: e ? e.value : '' })
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'quantifier', answerer: answerer, value: e ? e.value : ''})
            }}
          />
        }
        {!sentence.disableNumber &&
          <Select
            styles={customStyles}
            name='number'
            value={sentence.number ? {value: sentence.number, label: sentence.number} : null}
            defaultValue={null}
            isDisabled={sentence.disableNumber}
            isClearable={true}
            options={numberOptions}
            closeMenuOnSelect={true}
            onChange={(e) => {
              // updateSentence({ type: 'number', value: e ? e.value : '' })
              liveUpdate({type: 'BUILDER', uid: uid, i: i, property: 'number', answerer: answerer, value: e ? e.value : ''})
            }}
          />
        }
      </Flex>
  )
}
