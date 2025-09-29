import { Box } from '@mui/material'
import React from 'react'
import { Header } from './Header'

export const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box>
            {children}
        </Box>
    </Box>
  )
}
