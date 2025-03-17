"use client"
import React from 'react'
import { XwyaForm, FormItemsProps, useForm, zodResolver, z, useEffect, ReactNode } from '@/rely/admin_global'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/rely/admin_ui'
type XwyaGoodsTypeDialogProps = {
  children: ReactNode,
  title: string,
  id?:number |string
}
const items:FormItemsProps[] = [
  { type: "input", item: { label: "承運車輛", name: "name" }, content: { placeholder: "請輸入承運車輛" } },
]
const schema = z.object({
  name: z.string().min(1, { message: "種類名稱不能為空" }),
})
const returnData = (): Promise<z.infer<typeof schema>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
          name:'123213'
        })
    }, 1000) // 模拟500ms的延迟
  })
}
const XwyaCarrierTypeDialog = ({ title, children,id }: XwyaGoodsTypeDialogProps) => {
  const [open, setOpen] = React.useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ""
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

export default XwyaCarrierTypeDialog