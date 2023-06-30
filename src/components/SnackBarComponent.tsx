import { useState } from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'

type Props = {
  open: boolean
  message: string
  severity?: 'success' | 'error' | 'info' | 'warning'
}

export function SnackBarComponent({
  open,
  message,
  severity = 'success',
}: Props) {
  const [isOpen, setIsOpen] = useState(open)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen}
        onClose={handleClose}
        key={message}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
