import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Button
} from 'rebass'


export default function Tabs({children, activeTab, setTab}){
  const [ responses, instructions ] = children
  const tabs = {
    one: responses,
    two: instructions
  }

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
          minWidth:'15%',
          height:'100%',
          flexDirection:'column',
          justifyContent:'flex-start',
          alignItems:'stretch'
        }}
      >
        <Button
          sx={{
            width:'auto',
            bg: activeTab === 'one' ? 'text' : 'primary',
            borderRadius: 0,
            borderBottomColor: activeTab === 'one' ? 'darkorange' : 'primary',
            borderWidth: '0px 0px 3px 0px',
            borderStyle: 'solid',
            color: activeTab === 'one' ? 'secondary' : 'tertiary',
            px:'2vmin',
            py:'1.5vmin',
            '&:hover': {
              color: activeTab === 'one' ? 'canary' : 'lightgreen',
              borderBottomColor: activeTab === 'one' ? 'canary' : 'lightgreen',
            }
          }}
          onClick = {() => setTab('one')}
        >
          <Heading
          sx={{
            fontSize:'medium',
            textAlign:'right',
            }}>
            {responses.props.id}
          </Heading>
        </Button>
        <Button
          sx={{
            width:'auto',
            bg: activeTab === 'two' ? 'text' : 'primary',
            borderRadius: 0,
            borderBottomColor:activeTab === 'two' ? 'darkorange' : 'primary',
            borderWidth: '0px 0px 3px 0px',
            borderStyle: 'solid',
            color: activeTab === 'two' ? 'secondary' : 'tertiary',
            px:'2vmin',
            py:'1.5vmin',
            '&:hover': {
              color: activeTab === 'two' ? 'canary' : 'lightgreen',
              borderBottomColor: activeTab === 'two' ? 'canary' : 'lightgreen',
            }
          }}
          onClick = {() => setTab('two')}
        >
          <Heading
          sx={{
            fontSize:'medium',
            textAlign:'right',
            }}>
            {instructions.props.id}
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
          pt:'1vmin'
        }}
      >
        {tabs[activeTab]}
      </Flex>
    </Flex>
  )
}
