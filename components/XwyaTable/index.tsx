'use client'
import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,

} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// const data: Payment[] = [
//   {
//     id: 'm5gr84i9',
//     amount: 316,
//     status: 'success',
//     email: 'ken99@yahoo.com',
//   },
//   {
//     id: '3u1reuv4',
//     amount: 242,
//     status: 'success',
//     email: 'Abe45@gmail.com',
//   },
//   {
//     id: 'derv1ws0',
//     amount: 837,
//     status: 'processing',
//     email: 'Monserrat44@gmail.com',
//   },
//   {
//     id: '5kma53ae',
//     amount: 874,
//     status: 'success',
//     email: 'Silas22@gmail.com',
//   },
//   {
//     id: 'bhqecj4p',
//     amount: 721,
//     status: 'failed',
//     email: 'carmella@hotmail.com',
//   },
// ]

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
/***
 * id：唯一标识符
 *
 * header: 渲染表頭内容
 * table.getIsAllPageRowsSelected() : 如果所有的行都被選中，則返回 true。
 * table.getIsSomePageRowsSelected() : 如果部分行被選中，則返回 true。
 * table.toggleAllPageRowsSelected() : 選中或取消選中所有的行。
 *
 * cell: 渲染每个单元格的内容
 * row.getIsSelected() : 如果行被選中，則返回 true。
 * row.toggleSelected() : 選中或取消選中行。
 * enableSorting: false : 禁用排序功能。
 * enableHiding: false : 禁用隐藏列功能。
 *
 * accessorKey: 指定列的访问器键。
 * header: 表頭文本
 *  minSize: 最小寬度,
 * maxSize: 最大寬度,
 * row.getValue(key) : 获取行中指定键的值。
 *  <ArrowUpDown /> 排序組件
 */


const XwyaTable = ({ data=[],columns=[],total=1,onChange,page })=> {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table =useReactTable({
    data,
    columns,
    onSortingChange: setSorting, // 排序發生變化的回調
    onColumnFiltersChange: setColumnFilters, // 当列过滤器发生变化时的回调函数
    getCoreRowModel: getCoreRowModel(), // 获取表格的基本行数据
    getPaginationRowModel: getPaginationRowModel(), //获取分页的行数据模型
    getSortedRowModel: getSortedRowModel(), // 获取排序的行数据模型
    getFilteredRowModel: getFilteredRowModel(), // 获取过滤后的行数据模型
    onColumnVisibilityChange: setColumnVisibility, // 当列的可见性发生变化时的回调函数
    onRowSelectionChange: setRowSelection, // 当行的选择状态发生变化时的回调函数
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page.pageNo - 1,
        pageSize: page.pageSize,
      }
    },
    pageCount: total,
  })

  const prev = async () => { 
    if (onChange) { 
      const pageNo = page.pageNo  -1
      if (pageNo <1) return
      onChange({...page,pageNo: pageNo }) && table.previousPage()
    }
    
  }
  const next = async () => { 
    if (onChange) { 
      const pageNo = page.pageNo + 1
      if (pageNo > total) return
      onChange({ ...page, pageNo: pageNo }) && table.nextPage()
    }
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className='min-h-[60vh]'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody  >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {/* 暫無數據. */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className=" flex items-center justify-end   space-x-2 py-4">
          <Button  size="sm" onClick={prev} disabled={!table.getCanPreviousPage()}>
            上一頁
          </Button>
          <Button  size="sm" onClick={ next}  disabled={!table.getCanNextPage()} >
            下一頁
          </Button>
          <div className="flex-1 text-sm text-muted-foreground">
          共 {table.getPageCount()} 頁
        </div>
      </div>
    </div>
  )
}
export default XwyaTable
