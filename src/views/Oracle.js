import React, {useState} from 'react'
import crystalball from '../assets/people/oracle1.png'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'


export default function Credits({ onClick }) {
  const credits = []
  const [isCredits, setIsCredits] = useState(false)
  return (
    <Popover
      isOpen={isCredits}
      position={['right', 'top']}
      onClickOutside={e => setIsCredits(!isCredits)}
      transitionDuration={0.25}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={'#FFFFFF'}
          arrowSize={10}
          style={{margin:'10px'}}
        >
          {credits.map(credit =>
            <Text sx={{fontFamily:'body', lineHeight:'body',fontSize:'tiny',color:'foreground'}}>{credit}</Text>
          )}
        </ArrowContainer>
      )}
    >
      <Button sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        border: 'none',
        bg: 'transparent'
      }} onClick={() => setIsCredits(!isCredits)}>
        <Heading sx={{fontSize:'medium', color:'primary', pb:1}}>THE ORACLE</Heading>
        <Image src={crystalball} alt='oracle' sx={{width: '100px'}}/>
      </Button>
    </Popover>

  )
}
