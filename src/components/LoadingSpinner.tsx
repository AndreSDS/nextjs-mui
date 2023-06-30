import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
