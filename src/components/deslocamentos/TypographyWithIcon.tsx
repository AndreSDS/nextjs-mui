import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  text: string
  icon: ReactNode
}

export function TypographyWithIcon({ text, icon }: Props) {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      {icon}
      <Typography variant="body1">{text}</Typography>
    </Box>
  )
}
