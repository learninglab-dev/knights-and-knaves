import React from 'react'
import { Text } from 'rebass'

export const Body = props =>
  <Text sx={{
    fontFamily:'body',
    color:'primary',
    fontSize:'small',
    }}
  >
    {...props}
  </Text>
