"use client"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import XwyaForm from '@/components/XwyaForm'
type XwyaGoodsTypeDialogProps = {
  children: ReactNode,
  title:string
}
const items = [
  { type: "input", item: { label: "種類名稱", name: "name" }, content: { placeholder: "請輸入種類名稱" } },
]
const schema = z.object({
  name: z.string().min(1, { message: "種類名稱不能為空" }),
})
const returnData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
          name:123213
        })
    }, 1000) // 模拟500ms的延迟
  })
}
const XwyaGoodsTypeDialog = ({ title, children,id }: XwyaGoodsTypeDialogProps) => {
  const [open, setOpen] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
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

export default XwyaGoodsTypeDialog