"use client"
import React from 'react'
import { XwyaForm, FormItemsProps, useForm, zodResolver, z, useEffect, ReactNode } from '@/rely/admin_global'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/rely/admin_ui'
type XwyaGoodsDialogProps = {
  children: ReactNode,
  title: string
  id?: number | string
}
const items:FormItemsProps[] = [
  { type: "input", item: { label: "用戶名", name: "name" }, content: { placeholder: "請輸入用戶名" } },
  { type: "input", item: { label: "賬號", name: "names" }, content: { placeholder: "請輸入賬號" } },
  { type: "input", item: { label: "密碼", name: "password" }, content: { placeholder: "請輸入密碼", type: "password" } },
  {
    type: "select", item: { label: "所屬系統", name: "system" }, content: {
      placeholder: "請選擇所屬系統", options: [
        { label: "前臺用戶", value: "1" },
        { label: "後臺用戶", value: "2" }
  ]} }
]
const schema = z.object({
  name: z.string().min(1, { message: "種類名稱不能為空" }),
  names: z.string().min(1, { message: "種類名稱不能為空" }),
  password: z.string().refine(data => (!!data),{
    message: "請輸入密碼",
  }),
  system: z.enum(["1", "2"], { message: "請選擇所屬系統" }),

})
const returnData = ():Promise<z.infer<typeof schema>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
          name: "123213",
          names: "12321321",
          password: "12321321",
          system:"1"
        })
    }, 1000) // 模拟500ms的延迟
  })
}
const XwyaUserDialog = ({ title, children,id }: XwyaGoodsDialogProps) => {
  const [open, setOpen] = React.useState(false)


  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      names: "",
      password: "",
      system:void 0
    },
  })
  const onFinish = (values: any) => { 
    console.log(values);
    form.reset()
  }
  const getInfo = async () => {
    const res = await returnData()
    form.reset(res)
    
  }
  useEffect(() => { 
   open && id && getInfo()
  },[open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger  asChild>
     {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>{ title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
          <XwyaForm items={items} onFinish={onFinish} form={form}>
            <div className=' flex justify-center items-center w-full gap-4'>
             <Button type="submit">確認</Button>
             <Button type="button" variant="outline" onClick={()=>setOpen(false)} >取消</Button>
            </div>
         </XwyaForm>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default XwyaUserDialog