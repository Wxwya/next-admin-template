'use client'
import React, { useState} from 'react'
import Layout from '@/components/Layout'
import  XwyaForm  from '@/components/XwyaForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Calendar } from "@/components/ui/calendar"


const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  sex: z.enum(['1', '2'], {
    required_error: 'Sex is required',
  }),
  Radio: z.string().min(1, {
    message: 'Radio is required',
  }),
  Checkbox: z.array(z.string()).optional(),
  textarea:z.string().optional(),
  // bio: z
  //   .string()
  //   .min(1, {
  //     message: 'Bio is required',
  //   })
  //   .min(10, {
  //     message: 'Bio must be at least 10 characters.',
  //   })
    // .max(160, {
    //   message: 'Bio must not be longer than 30 characters.',
    // }),
  Switch: z.boolean().default(false),
  filelist:z.array(z.string()).min(1,{message:'請上傳圖片'}).max(3,{message:'最多只能上傳3張圖片'}),
  date: z.date(),
  range: z.object({
    to: z.date(),
    from: z.date(),
  }).default({to:new Date(),from:new Date()})
  // UploadFile: z.array(z.string()).default([]),
})
const items = [
  { type: "input", item: { label: "用戶名", name: "username" }, content: { placeholder: "請輸入用戶名" } },
  { type: "select", item: { label: "性別", name: "sex" }, content: { placeholder: "請選擇性別", options: [{ label: "男", value: "1" }, { label: "女", value: "2" }] } },
  { type: "radio", item: { label: "單選", name: "Radio" }, content: { options: [{ label: "男", value: "1" }, { label: "女", value: "2" }] } },
  { type: "checkbox", item: { label: "多選", name: "Checkbox" }, content: { options: [{ label: "男", value: "1" }, { label: "女", value: "2" }] } },
  { type: "switch", item: { label: "開關", name: "Switch" }, },
  { type: "textarea", item: { label: "多行文本", name: "textarea" }, content: { placeholder: "請輸入多行文本" } },
  { type: "upload", item: { label: "上傳圖片", name: "filelist" }, content: { multiple: true, accept: "image/*" } },
  { type: "date", item: { label: "日期", name: "date" }, content: { placeholder: "請選擇日期" } },
  { type: "range", item: { label: "日期", name: "range" }, content: {startPlaceholder: "開始日期",endPlaceholder:"結束日期"} }
]
// const items = [
//   {
//     id: 'recents',
//     label: 'Recents',
//   },
//   {
//     id: 'home',
//     label: 'Home',
//   },
//   {
//     id: 'applications',
//     label: 'Applications',
//   },
// ]
const FormPage = () => {
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      range: {
        from: void 0,
        to: void 0,
      }
    },
   })
  // const [date,setDate] = useState( new Date())
  const onFinish = (values:any) => { 
    console.log(values);
  }
  return (
    <Layout page='表单' pathKey='/form'>
      <div className=' p-4'>
        <XwyaForm items={items} form={form} onFinish={onFinish} />

      </div>

    </Layout>
  )
}

export default FormPage