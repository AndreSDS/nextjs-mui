'use client'

import { Box, Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Cliente, Condutor, Deslocamento, Veiculo } from '@/utils/types'
import { Header } from '@/components/Header'

type Props = {
  data: Cliente[] | Condutor[] | Deslocamento[] | Veiculo[] | undefined
  columns: GridColDef[]
  handleClickItem: (id: number) => void
  headerTitle: string
  headerSubTitle: string
  handleClickHeader: () => void
  hasButton?: boolean
}

export function DataListComponent({
  headerTitle,
  headerSubTitle,
  handleClickItem,
  handleClickHeader,
  hasButton = false,
  data,
  columns,
}: Props) {
  return (
    <Box
      width="80%"
      height="100%"
      maxWidth="1300px"
      paddingBottom="2rem"
      marginTop="6rem"
    >
      <Header
        title={headerTitle}
        subTitle={headerSubTitle}
        handleClick={handleClickHeader}
        hasButton={hasButton}
      />

      <Paper>
        <DataGrid
          onCellClick={(row) => handleClickItem(row.id as number)}
          rows={data || []}
          columns={columns}
          pagination
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            overflow: 'auto',
            height: '100%',
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
        />
      </Paper>
    </Box>
  )
}
