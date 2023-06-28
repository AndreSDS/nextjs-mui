import { ReactNode } from 'react'
import { Dialog } from '@mui/material'

type Props = {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export function Modal({ children, open, onClose }: Props) {
  return (
    <Dialog
      sx={{
        '& .mui-style-1qxadfk-MuiPaper-root-MuiDialog-paper': {
          maxHeight: 'calc(100% - 34px)',
        },
      }}
      onClose={onClose}
      open={open}
    >
      {children}
    </Dialog>
  )
}
