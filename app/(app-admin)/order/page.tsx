'use client'
import React from 'react'
import Link from 'next/link'
import { Button,XwyaPopover  } from "@/rely/admin_ui"
import {CustomColumnDef,useForm,zodResolver,z,usePage,PageType,XwyaTable, XwyaForm,FormItemsProps,Layout,useEffect} from "@/rely/admin_global"
type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
const schema = z.object({
  name: z.string().optional(),
  namess: z.string().optional(),
  namesss: z.string().optional(),
  names: z.string().optional(),
  range: z
    .object({
      to: z.date().optional(),
      from: z.date().optional(),
    })
    .optional(),
})
const items:FormItemsProps[] = [
  { type: 'input', item: { label: '貨物名稱', name: 'name' }, content: { placeholder: '請輸入貨物名稱' } },
  { type: 'input', item: { label: '再交名稱', name: 'names' }, content: { placeholder: '請輸入再交名稱' } },
  {
    type: 'select',
    item: { label: '貨物種類', name: 'namess' },
    content: {
      placeholder: '請選擇貨物種類',
      options: [
        { label: '前臺用戶', value: '1' },
        { label: '後臺用戶', value: '2' },
      ],
    },
  },
  {
    type: 'select',
    item: { label: '承運車輛', name: 'namesss' },
    content: {
      placeholder: '請選擇承運車輛',
      options: [
        { label: '前臺用戶', value: '1' },
        { label: '後臺用戶', value: '2' },
      ],
    },
  },
  { type: 'range', item: { label: '日期', name: 'range' }, content: { startPlaceholder: '開始日期', endPlaceholder: '結束日期' } },
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

const Order = () => {
  const { page, setData, data, setPage, loading, setLoading, total, setTotal } = usePage()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      namess: '',
      namesss: '',
      names: '',
      range: {
        from: void 0,
        to:void 0,
      },
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
  const columns: CustomColumnDef<Payment>[] = [
    {
      accessorKey: 'status',
      header: '序號',
      className: 'w-[80px]',
      cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
    },
    {
      accessorKey: 'email',
      header: '再交名稱',
      className: 'w-[80px]',
      cell: ({ row }) => <div className="lowercase  truncate">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'emails',
      header: '貨物種類',
      className: 'w-[200px]',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semails',
      className: 'w-[200px]',
      header: '貨物',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semailss',
      className: 'w-[200px]',
      header: '承運車輛',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semailssss',
      className: 'w-[200px]',
      header: '出庫通知單',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semailsss',
      className: 'w-[200px]',
      header: '確認單號',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semailsssss',
      className: 'w-[200px]',
      header: '貨物重量',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'semailssssss',
      className: 'w-[200px]',
      header: '貨物圖片',
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    // {
    //   id: 'actions',
    //   header: '操作',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original
    //     return (
    //       <div className="flex gap-2 cursor-pointer">
    //          <XwyaUserDialog title='編輯用戶' id={payment.id}>
    //           <span>修改</span>
    //         </XwyaUserDialog>
    //         <XwyaPopover onConfirm={onConfirm} content={{ side: "top" }} text='確認刪除該貨物種類嗎？'><span className=" text-red-600">刪除</span></XwyaPopover>
    //       </div>
    //     )
    //   },
    // },
  ]
  useEffect(() => {
    getData()
  }, [page])
  return (
    <Layout page="訂單管理" pathKey="/order">
      <div className="h-full flex flex-col gap-4 ">
        <XwyaForm items={items} row={5} form={form} onFinish={onFinish}>
          <div className=" flex gap-2">
            <Button type="submit" size="sm">
              搜索
            </Button>
            <Button onClick={onFormReset} type="button" variant="destructive" size="sm">
              重置
            </Button>
            <Button variant="outline" type="button">
              導出
            </Button>
          </div>
        </XwyaForm>
        <XwyaTable className="flex-1 flex flex-col" data={data} loading={loading} total={total} columns={columns} page={page} onChange={onChange} />
      </div>
    </Layout>
  )
}

export default Order
