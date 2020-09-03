import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, Text, Heading} from 'rebass'

export default function Modal({children}) {
  const [id, setId] = useState(null)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {children}
    </Box>
  )
}
