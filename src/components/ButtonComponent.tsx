import { Delete, Edit } from '@mui/icons-material'
import { Button, ButtonProps, CircularProgress } from '@mui/material'

interface Props extends ButtonProps {
  textButton: string
  hasIcon?: 'delete' | 'edit' | 'add'
}

export function ButtonComponent({ textButton, hasIcon, ...props }: Props) {
  return (
    <Button
      title={textButton}
      sx={{
        alignSelf: 'flex-end',
        marginTop: '1.5rem',
      }}
      color={
        hasIcon === 'edit' ? 'info' : hasIcon === 'delete' ? 'error' : 'primary'
      }
      variant={hasIcon === 'delete' ? 'outlined' : 'contained'}
      startIcon={hasIcon === 'delete' ? <Delete /> : <Edit />}
      {...props}
    >
      {textButton}
    </Button>
  )
}
