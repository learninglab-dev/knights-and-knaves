import React from 'react'
import bugSvg from '../assets/bug.svg'
import bubbleSvg from '../assets/bubble.svg'
import {Flex, Box, Text, Heading, Button} from 'rebass'
import styled from 'styled-components'

const formLink = 'https://forms.gle/w5Jmetvdh3iCP2r6A'

const BugWrapper = styled.div`
  display: grid;
  grid-template-rows:  auto 25px;
  grid-template-columns: 25px;
  grid-area: bug;
  padding-bottom: 0;
  position: absolute;
  bottom: 16px;
  right: 12px;
`

const StyledButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  grid-column: 1/1;
  grid-row: 2/2;
`

const StyledCaption = styled.div`
  display: block;
  color:${props => props.theme.colors.secondary};
  grid-column: 1/1;
  grid-row: 1/1;
  > h4 {
    color: inherit;
    font-family : 'Thintel', monospace;
    font-size: 20px;
    text-align: center;
    letter-spacing: 1px;
    margin: -8px;
  }
`

export default function Bug({ onClick }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateRows: 'auto 25px',
      gridTemplateColumns: '25px',
      gridArea: 'bug',
      position: 'absolute',
      bottom: '16px',
      right: '12px'
    }}>
        <Box sx={{
          display: 'block',
          color: 'secondary',
          gridColumn: '1/1',
          gridRow: '1/1',
          pb: 2,
        }}onClick={onClick}
          ><Heading sx={{fontSize:'tiny', color:'foreground'}}>BUGS?</Heading>
        </Box>
        <Box sx={{
          display: 'block',
          cursor: 'pointer',
          border: 'none',
          gridColumn: '1/1',
          gridRow: '2/2',
        }} onClick={onClick}>
          <a href={formLink} alt='Bug Report Google Form' target="_blank" rel="noopener noreferrer">
            <img src={bugSvg} alt='report bugs' style={{width: '25px', transform:'rotate(300deg)'}}/>
          </a>
        </Box>
    </Box>
  )
}
