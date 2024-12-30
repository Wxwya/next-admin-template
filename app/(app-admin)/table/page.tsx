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
const pageData = [
  { id: "2hamdo36", amount: 993, status: "pending", email: "sara23@outlook.com" },
  { id: "60sxztpl", amount: 288, status: "failure", email: "ken52@outlook.com" },
  { id: "yyeqhsel", amount: 604, status: "failure", email: "sara83@gmail.com" },
  { id: "djq5u1zk", amount: 932, status: "failure", email: "alex26@gmail.com" },
  { id: "3e4vvwko", amount: 292, status: "failure", email: "john25@outlook.com" },
  { id: "eao2kxmx", amount: 778, status: "pending", email: "john25@yahoo.com" },
  { id: "6uw75zgl", amount: 582, status: "failure", email: "mike32@gmail.com" },
  { id: "2blvpk10", amount: 692, status: "pending", email: "ken99@hotmail.com" },
  { id: "11yz66ys", amount: 446, status: "pending", email: "ken98@outlook.com" },
  { id: "el6np7wx", amount: 696, status: "failure", email: "alex74@outlook.com" },
  { id: "skt39nu0", amount: 905, status: "success", email: "john85@yahoo.com" },
  { id: "os0xlrtk", amount: 738, status: "success", email: "tom88@hotmail.com" },
  { id: "807c3zn6", amount: 765, status: "failure", email: "ken40@hotmail.com" },
  { id: "xagzw43m", amount: 481, status: "pending", email: "john41@hotmail.com" },
  { id: "czox1tp8", amount: 446, status: "failure", email: "lisa29@hotmail.com" },
  { id: "o4ri274q", amount: 444, status: "failure", email: "jane82@yahoo.com" },
  { id: "133nkfe6", amount: 952, status: "pending", email: "sara82@yahoo.com" },
  { id: "df0bes0e", amount: 427, status: "success", email: "sara88@gmail.com" },
  { id: "v9vdvknh", amount: 866, status: "pending", email: "sara38@hotmail.com" },
  { id: "vk9stmwd", amount: 711, status: "success", email: "tom97@gmail.com" },
];

const Table = () => {
  const { page,setData,data,setPage,loading,setLoading,total,setTotal } = usePage()
  const returnData = (pageIndex) => { 
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const pageSize = 10; // 每页的条数
          const startIndex = (pageIndex - 1) * pageSize; // 起始索引
          const endIndex = startIndex + pageSize; // 结束索引
          const pagesData = pageData.slice(startIndex, endIndex); // 分割数据
    
          if (pagesData.length > 0) {
            resolve(pagesData);
          } else {
            reject({
              status: "error",
              message: "No data found for the requested page.",
            });
          }
        }, 1000); // 模拟500ms的延迟
      });
  }
  const getData = async () => { 
    setLoading(true)
    const res = await returnData(page.pageNo)
    setData([...res])
    setTotal(Math.ceil(20 / page.pageSize))
    setLoading(false)
  }
  const addNum = () => { 
    setPage({
      ...page,
      pageNo:page.pageNo + 1
    })
  }
  const sousuo = () => { 
    // getData()
    setPage({...page,pageNo:1})
  }
  const onChange = (page) => { 
    setPage(page)
    return true
  }
  useEffect(() => { 
    console.log("開始獲取數據",page);
    getData()
  },[page])
  return (
    <Layout page="表格" pathKey='/table'>
      <XwyaTable data={data} loading={loading} total={total} columns={columns}  page={page} onChange={onChange}  />
      <div onClick={sousuo}>搜索</div>
      {/* <div onClick={addNum}>下一頁</div>  */}
    </Layout>
  )
}

export default Table