import React, {useState} from 'react'
import {Flex, Box, Heading, Button,} from 'rebass'

export default function Tabs({children, defaultIndex}){
  const [ tab1, tab2 ] = children
  const tabs = {
    one: tab1,
    two: tab2
  }
  const [active, setActive] = useState(defaultIndex ? Object.keys(tabs)[defaultIndex] : Object.keys(tabs)[0])
  return (
    <Flex
      id='allContainer'
      sx={{
          width:'100%',
          height:'100%',
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'stretch'
      }}>
      <Flex
        id='tabsContainer'
        sx={{
          width:'auto',
          minWidth:160,
          height:'100%',
          flexDirection:'column',
          justifyContent:'flex-start',
          alignItems:'stretch'
        }}
      >
        <Button
          sx={{
            width:'auto',
            bg: active == 'one' ? 'text' : 'primary',
            borderRadius: 0,
            borderBottomColor: active == 'one' ? 'darkorange' : 'primary',
            borderWidth: '0px 0px 3px 0px',
            borderStyle: 'solid',
            color: active == 'one' ? 'secondary' : 'tertiary',
            px:20,
            py:15,
            '&:hover': {
              color: active == 'one' ? 'canary' : 'lightgreen',
              borderBottomColor: active == 'one' ? 'canary' : 'lightgreen',
            }
          }}
          onClick = {() => {setActive('one')}}
        >
          <Heading
          sx={{
            fontSize:'medium',
            textAlign:'right',
            }}>
            {tab1.props.id}
          </Heading>
        </Button>
        <Button
          sx={{
            width:'auto',
            bg: active == 'two' ? 'text' : 'primary',
            borderRadius: 0,
            borderBottomColor:active == 'two' ? 'darkorange' : 'primary',
            borderWidth: '0px 0px 3px 0px',
            borderStyle: 'solid',
            color: active == 'two' ? 'secondary' : 'tertiary',
            px:20,
            py:15,
            '&:hover': {
              color: active == 'two' ? 'canary' : 'lightgreen',
              borderBottomColor: active == 'two' ? 'canary' : 'lightgreen',
            }
          }}
          onClick = {() => {setActive('two')}}
        >
          <Heading
          sx={{
            fontSize:'medium',
            textAlign:'right',
            }}>
            {tab2.props.id}
          </Heading>
        </Button>
        <Box
          sx={{
            height:'100%',
            bg:'primary'
          }}
        />
      </Flex>
      <Flex
        id='contentContainer'
        sx={{
          width:'100%',
          height:'100%',
        }}
      >
        {tabs[active]}
      </Flex>
    </Flex>
  )
}
