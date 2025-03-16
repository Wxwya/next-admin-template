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
import toast from "react-hot-toast"



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


const XwyaTable = ({ data=[],columns=[],total=1,onChange,page,loading,className })=> {
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
    // getPaginationRowModel: getPaginationRowModel(), //获取分页的行数据模型
    getSortedRowModel: getSortedRowModel(), // 获取排序的行数据模型
    getFilteredRowModel: getFilteredRowModel(), // 获取过滤后的行数据模型
    onColumnVisibilityChange: setColumnVisibility, // 当列的可见性发生变化时的回调函数
    onRowSelectionChange: setRowSelection, // 当行的选择状态发生变化时的回调函数
    // onPaginationChange:onChangePage,
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
      onChange({ ...page, pageNo: pageNo }) 
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('User pressed Enter:', );
      if (Number(event.target.value) <= 0 || Number(event.target.value) > total) { 
        toast.error("請輸入正確的頁碼")
        return 
      }
      onChange({ ...page, pageNo:Number(event.target.value)})&& table.setPageIndex(Number(event.target.value))
    }
  };
  return (
    
    <div   className={ className} >
      <div className="rounded-md border ">
        <Table className='min-h-[60vh]  w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) =>(
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}  >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows.map((row) => (
              <TableRow  key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}   >{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
              </TableRow>
            ))}
         
            { !loading&&!table.getRowModel().rows.length&&<TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    暂无数据.
              </TableCell>
            </TableRow>}
              
            { loading&&<TableRow><TableCell className=' absolute inset-0 flex justify-center bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,0,0,.3)] items-center  z-20'>正在加载...</TableCell></TableRow>}

          </TableBody>
        </Table>
      </div>
      <div className=" flex items-center  justify-end space-x-2 py-4">
      <div className="text-sm text-muted-foreground ">
          共 {table.getPageCount()} 頁
        </div>
          <Button variant="outline"  size="sm" onClick={prev} disabled={!table.getCanPreviousPage()}>
            上一頁
          </Button>
          <Button variant="outline"   size="sm" onClick={ next}  disabled={!table.getCanNextPage()} >
            下一頁
          </Button>
        <div className=' text-sm items-center text-muted-foreground flex gap-2'>
          <span>跳至</span>
          <Input className='w-10'  onKeyPress={handleKeyPress}  />
          <span>頁</span>
        </div> 
      </div>
    </div>
  )
}
export default XwyaTable
