'use client'
import React from 'react'
import BlurIn from '@/components/ui/blur-in'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import XwyaForm from '@/components/XwyaForm'
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: '密碼不能小於6位',
  }),
})
const items = [
  { type: 'input', item: { label: '账号', name: 'username' }, content: { placeholder: '請輸入用戶名' } },
  { type: 'input', item: { label: '密码', name: 'password' }, content: { placeholder: '請輸入密碼', type: 'password' } },
]
const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  console.log(form)

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className=" relative p-10 h-screen ">
      {/* <BlurIn word="Xwya博客管理后台系统" className=' text-left !text-4xl' /> */}
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
        <Card className="w-[350px] shadow-md animate-dropAndZoomOnce">
          <CardHeader>
            <CardTitle className=" text-center" asChild>
              Xwya博客管理后台系统
            </CardTitle>
          </CardHeader>
          <CardContent>
            <XwyaForm items={items} form={form} layout="vertical" onFinish={onFinish}>
              <div className="mt-4 w-full">
                <Button className=" w-full text-base" type="submit">
                  <span className="iconify line-md--loading-loop"></span>
                  <span>登錄</span>
                </Button>
              </div>
            </XwyaForm>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
