import React, {useState} from 'react'
import info from '../assets/info.svg'
import {Flex, Box, Text, Heading, Button, Image} from 'rebass'
import Popover, {ArrowContainer} from 'react-tiny-popover'

const credits = [ 'Concept by Ned Hall',
                  'Developed by Lauren Davidson and Phil Fahn-Lai',
                  'Illustrations by Rachel D’Erminio, Courtesy of the President and Fellows of Harvard College',
                  'Brought to you by the Learning Lab at the Harvard Bok Center for Teaching And Learning']
export default function Credits({ onClick }) {
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
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        border: 'none',
        bg: 'transparent'
      }} onClick={() => setIsCredits(!isCredits)}>
        <Heading sx={{fontSize:'tiny', color:'foreground', pb:1}}>CREDITS</Heading>
        <img src={info} alt='report bugs' style={{width: '25px'}}/>
      </Button>
    </Popover>

  )
}
