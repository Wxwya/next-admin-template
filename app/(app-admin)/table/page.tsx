"use client"
import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import XwyaTable, { Payment } from '@/components/XwyaTable'
import usePage from '@/hooks/usePage'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
const Table = () => {
  // const [data,setData] = useState([])
  const { page,setData,data,setPage,loading,setLoading,total,setTotal } = usePage()
  const returnData = () => { 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: "m5gr84i9",
            amount: 316,
            status: "success",
            email: "ken99@yahoo.com",
          },
          {
            id: "3u1reuv4",
            amount: 242,
            status: "success",
            email: "Abe45@gmail.com",
          },
          {
            id: "derv1ws0",
            amount: 837,
            status: "processing",
            email: "Monserrat44@gmail.com",
          },
          {
            id: "5kma53ae",
            amount: 874,
            status: "success",
            email: "Silas22@gmail.com",
          },
          {
            id: "bhqecj4p",
            amount: 721,
            status: "failed",
            email: "carmella@hotmail.com",
          },
          {
            id: "m5g2r84i9",
            amount: 316,
            status: "success",
            email: "ken99@yahoo.com",
          },
          {
            id: "3u1re2uv4",
            amount: 242,
            status: "success",
            email: "Abe45@gmail.com",
          },
          {
            id: "derv1w2s0",
            amount: 837,
            status: "processing",
            email: "Monserrat44@gmail.com",
          },
          {
            id: "5kma532ae",
            amount: 874,
            status: "success",
            email: "Silas22@gmail.com",
          },
          {
            id: "bhqecj24p",
            amount: 721,
            status: "failed",
            email: "carmella@hotmail.com",
          },
        ])
      }, 1000)
    })
  }
  const getData = async () => { 
    const res = await returnData()
    console.log(res,"res");
    setData([...res])
    setTotal(Math.ceil(110/page.pageSize))
  }
  const addNum = () => { 
    setPage({
      ...page,
      pageNo:page.pageNo + 1
    })
  }
  const onChange = (page) => { 
    console.log(page);
    
    setPage(page)
    return true
  }
  useEffect(() => { 
    console.log("開始獲取數據");
    
    getData()
  },[page])
  return (
    <Layout page="表格" pathKey='/table'>
      <XwyaTable data={data} total={total} columns={columns} page={page} onChange={onChange}  />
      
      {/* <div onClick={addNum}>下一頁</div>  */}
  

    </Layout>
  )
}

export default Table