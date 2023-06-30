import { Add } from '@mui/icons-material'
import { Box, Button, Typography, colors } from '@mui/material'
import { ButtonComponent } from '@/components/ButtonComponent'

type Props = {
  title: string
  subTitle: string
  hasButton?: boolean
  handleClick?: () => void
}

export function Header({
  title,
  subTitle,
  hasButton = false,
  handleClick,
}: Props) {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="end"
      mb="2rem"
    >
      <Box>
        <Typography
          variant="h2"
          fontSize="2.5rem"
          lineHeight={1.2}
          fontWeight="bold"
          sx={{ mb: '0.25rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontSize="1rem"
          lineHeight={1.2}
          color={colors.grey[400]}
        >
          {subTitle}
        </Typography>
      </Box>

      {hasButton ? (
        <ButtonComponent
          textButton="Adicionar"
          hasIcon="add"
          onClick={handleClick}
          variant="contained"
        />
      ) : null}
    </Box>
  )
}
