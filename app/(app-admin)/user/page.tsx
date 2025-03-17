'use client'
import React from 'react'
import XwyaUserDialog from '@/components/XwyaUserDialog'
import Link from 'next/link'
import { Button,XwyaPopover  } from "@/rely/admin_ui"
import {ColumnDef,useForm,zodResolver,z,usePage,PageType,XwyaTable, XwyaForm,FormItemsProps,Layout,useEffect} from "@/rely/admin_global"
type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
const schema = z.object({
  name: z.string().optional(),
  namess: z.string().optional(),
})
const items:FormItemsProps[] = [
  { type: 'input', item: { label: '用戶名', name: 'name' }, content: { placeholder: '請輸入用戶名' } },
  {
    type: 'select', item: { label: '所屬系統', name: 'namess' }, content: {
      placeholder: '請選擇所屬系統', options: [
        { label: "前臺用戶", value: "1" },
        {label:"後臺用戶",value:"2"}
  ] } },
]
const pageData = [
  { id: '2hamdo36', amount: 993, status: 'pending', email: 'sara23@outlook.com' },
  { id: '60sxztpl', amount: 288, status: 'failure', email: 'ken52@outlook.com' },
  { id: 'yyeqhsel', amount: 604, status: 'failure', email: 'sara83@gmail.com' },
  { id: 'djq5u1zk', amount: 932, status: 'failure', email: 'alex26@gmail.com' },
  { id: '3e4vvwko', amount: 292, status: 'failure', email: 'john25@outlook.com' },
  { id: 'eao2kxmx', amount: 778, status: 'pending', email: 'john25@yahoo.com' },
  { id: '6uw75zgl', amount: 582, status: 'failure', email: 'mike32@gmail.com' },
  { id: '2blvpk10', amount: 692, status: 'pending', email: 'ken99@hotmail.com' },
  { id: '11yz66ys', amount: 446, status: 'pending', email: 'ken98@outlook.com' },
  { id: 'el6np7wx', amount: 696, status: 'failure', email: 'alex74@outlook.com' },
  { id: 'skt39nu0', amount: 905, status: 'success', email: 'john85@yahoo.com' },
  { id: 'os0xlrtk', amount: 738, status: 'success', email: 'tom88@hotmail.com' },
  { id: '807c3zn6', amount: 765, status: 'failure', email: 'ken40@hotmail.com' },
  { id: 'xagzw43m', amount: 481, status: 'pending', email: 'john41@hotmail.com' },
  { id: 'czox1tp8', amount: 446, status: 'failure', email: 'lisa29@hotmail.com' },
  { id: 'o4ri274q', amount: 444, status: 'failure', email: 'jane82@yahoo.com' },
  { id: '133nkfe6', amount: 952, status: 'pending', email: 'sara82@yahoo.com' },
  { id: 'df0bes0e', amount: 427, status: 'success', email: 'sara88@gmail.com' },
  { id: 'v9vdvknh', amount: 866, status: 'pending', email: 'sara38@hotmail.com' },
  { id: 'vk9stmwd', amount: 711, status: 'success', email: 'tom97@gmail.com' },
]

const User = () => {
  const { page, setData, data, setPage, loading, setLoading, total, setTotal } = usePage()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      namess:""
    },
  })
  const onFinish = (values: any) => {
    console.log(values)
  }
  const returnData = (pageIndex:number):Promise<any[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pageSize = 10 // 每页的条数
        const startIndex = (pageIndex - 1) * pageSize // 起始索引
        const endIndex = startIndex + pageSize // 结束索引
        const pagesData = pageData.slice(startIndex, endIndex) // 分割数据

        if (pagesData.length > 0) {
          resolve(pagesData)
        } else {
          reject({
            status: 'error',
            message: 'No data found for the requested page.',
          })
        }
      }, 1000) // 模拟500ms的延迟
    })
  }
  const getData = async () => {
    setLoading(true)
    const res = await returnData(page.pageNo)
    setData([...res])
    setTotal(Math.ceil(20 / page.pageSize))
    setLoading(false)
  }
  const onChange = (page:PageType) => {
    setPage(page)
    return true
  }
  const onConfirm = () => { 
    return true
  }
  const onFormReset = () => { 
    form.reset()
  }
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'status',
      header: '序號',
      cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
    },
    {
      accessorKey: 'email',
      header: '用戶名',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'emails',
      header: '賬號',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semails',
      header: '所屬系統',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      id: 'actions',
      header: '操作',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <div className="flex gap-2 cursor-pointer">
             <XwyaUserDialog title='編輯用戶' id={payment.id}>
              <span>修改</span>
            </XwyaUserDialog>
            <XwyaPopover onConfirm={onConfirm} content={{ side: "top" }} text='確認刪除該貨物種類嗎？'><span className=" text-red-600">刪除</span></XwyaPopover>
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    getData()
  }, [page])
  return (
    <Layout page="用戶管理" pathKey="/user">
      <XwyaForm items={items} row={5} form={form} onFinish={onFinish}>
        <div className=' flex gap-2'>
          <Button type="submit" size="sm">搜索</Button>
          <Button onClick={onFormReset} type="button" variant="destructive" size="sm">重置</Button>
          <XwyaUserDialog title='新增用戶'>
              <Button variant="outline" type='button'>新增</Button>
          </XwyaUserDialog>
          
        </div>
      </XwyaForm>
      <XwyaTable className="mt-4" data={data} loading={loading} total={total} columns={columns} page={page} onChange={onChange} />
    </Layout>
  )
}

export default User
