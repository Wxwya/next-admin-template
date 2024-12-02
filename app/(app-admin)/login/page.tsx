import React from 'react'
import BlurIn from "@/components/ui/blur-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const Login = () => {
  
  return (
    <div className=' relative p-10 h-screen'>
       <BlurIn word="Xwya 后台管理系统" className=' text-left !text-4xl' />
      <div className=' absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 '>
        <Card className="w-[350px] animate-dropAndZoomOnce">
          <CardHeader>
            <CardTitle>欢迎登录</CardTitle>
          </CardHeader>
          <CardContent>
            <form autoComplete='off'>
                <div className=''></div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className=' w-full text-base'>
              <span className='iconify line-md--loading-loop'></span>
              <span>登录</span>
            </Button>
          </CardFooter>
      </Card>
   
      </div>
    </div>
  )
}

export default Login