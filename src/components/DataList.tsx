'use client'

import { Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Cliente, Condutor, Deslocamento, Veiculo } from '@/utils/types'

type Props = {
  data: Cliente[] | Condutor[] | Deslocamento[] | Veiculo[] | undefined
  columns: GridColDef[]
  handleClick: (id: number) => void;
}

export function DataList({ handleClick, data, columns }: Props) {
  return (
    <Paper>
      <DataGrid
        onCellClick={(row) => handleClick(row.id as number)}
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
  )
}
