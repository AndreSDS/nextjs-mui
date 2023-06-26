'use client'

import { useRouter } from 'next/navigation'
import { Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Cliente, Condutor, Deslocamento, Veiculo } from '@/utils/types'

type Props = {
  route: string;
  data: Cliente[] | Condutor[] | Deslocamento[] | Veiculo[] | undefined
  columns: GridColDef[]
}

export function DataList({ route, data, columns }: Props) {
  const router = useRouter()

  return (
    <Paper>
      <DataGrid
        onCellClick={(row) => router.push(`/${route}/${row.id}`)}
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
