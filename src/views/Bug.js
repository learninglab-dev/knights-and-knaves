import React from 'react'
import bugSvg from '../assets/bug.svg'
import {Flex, Box, Text, Heading, Button, Link} from 'rebass'

const formLink = 'https://forms.gle/w5Jmetvdh3iCP2r6A'

export default function Bug({ onClick }) {
  return (
    <Flex sx={{
      flexDirection:'column',
      alignItems:'center',
      border: 'none',
      textDecoration: 'none',
      bg: 'transparent'
    }} onClick={onClick}>
      <Link href={formLink} alt='Bug Report Google Form' target="_blank" rel="noopener noreferrer" sx={{textDecoration:'none'}}>
        <Heading sx={{fontSize:'tiny', color:'foreground', pb:2}}>BUGS?</Heading>
        <img src={bugSvg} alt='report bugs' style={{width: '25px', transform:'rotate(300deg)'}}/>
      </Link>
    </Flex>
  )
}
