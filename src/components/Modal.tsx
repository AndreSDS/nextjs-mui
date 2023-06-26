import { ReactNode } from 'react'
import { Dialog } from '@mui/material'

type Props = {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export function Modal({ children, open, onClose }: Props) {
  return (
    <Dialog onClose={onClose} open={open}>
      {children}
    </Dialog>
  )
}
