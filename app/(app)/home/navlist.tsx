"use client"; 

import React from 'react'
import { isExternal } from "@/utils/vaildate";
import { useRouter } from "next/navigation";
// 博客 个人介绍  github  掘金 搜索
type IconItem = {
  label: string,
  icon: string,
  path:string,
  operate?:boolean
}
const iconlist:IconItem[] = [
  { label: "About", icon: "iconify solar--bomb-emoji-bold",path:"/about" },
  { label: "Blog", icon: "iconify solar--book-2-bold",path:"/blog" },
  { label: "Juejin", icon: "iconify simple-icons--juejin",path:"https://juejin.cn/user/3837718667735863/posts" },
  { label: "Github", icon: "iconify simple-icons--github",path:"https://github.com/Wxwya" },
  { label: "Search", icon: "iconify solar--magnifer-linear",path:"/search",operate:true },
]
 const NavList = () => {
  const { push} = useRouter()
  const onClickPath = (row:IconItem) => {
    if (row.operate) { 
      console.log("打开搜索功能");
      return
    }
    if (isExternal(row.path)) {
      window.open(row.path, '_blank')
      return
    }
    push(row.path)
   }
  return (
    <div className=' text-white flex gap-4 items-center justify-center  mt-8 flex-wrap'>
    {iconlist.map((item, index) => (<div onClick={()=>onClickPath(item)} key={item.icon} title={item.label} className={`w-10 h-10 bg-[rgba(63,63,66,0.4)] rounded-sm border border-[#383838] hover:transition-all hover:scale-110 hover:cursor-pointer flex justify-center items-center`}>
      <span className={`${item.icon} text-2xl`}></span>
    </div>))
    }
  </div>
  )
}
export default NavList
