'use client'
import React, { useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import { menu } from './menu'
import BlurFade from "@/components/ui/blur-fade";
import AppMainHead from "@/components/AppMainHead"
import useSystemStore, { onChangeMenuGroupKeys, onChangeCollapsed } from '@/store/system'
type LayoutProps = {
  children: React.ReactNode
  pathKey: string
  groupKey?: string
  link?: string,
  page: string,
  href?: string
}
const variants = {
  hidden: {
    opacity: 0,
    x: -20, // 初始位置为左侧
    y:0
  },
  visible: {
    opacity: 1,
    x: 0, // 最终位置回到正常
    y:0,
    transition: {
      duration: 0.5, // 动画持续时间
    },
  },
};
const Layout = ({ children,pathKey,groupKey,link,page,href }: LayoutProps) => {
  const menuGroupKeys = useSystemStore(state => state.menuGroupKeys)
  const collapsed = useSystemStore(state => state.collapsed)
  const [selectedKey, setSelectedKey] = React.useState<string>(pathKey)
  const onChange = (key: string) => {
    setSelectedKey(key)
  }
  const config = {
    menuGroupKeys,
    selectedKey,
    onChange,
    items: menu,
    iconActiveColor: "#0ABD52",
  }
  useEffect(() => { 
    groupKey && onChangeMenuGroupKeys(groupKey,true) 
  },[])
  return (
      <SidebarProvider open={collapsed} onOpenChange={onChangeCollapsed}>
        <AppSidebar {...config} />
       
      <main className="flex-grow  flex flex-col">
        <AppMainHead link={link} page={page} href={href } />
         <BlurFade delay={0.25} variant={variants}  className=' flex-grow  ' inView>
        <div className=' h-full'>
        {children}
        </div>
          
           </BlurFade>
          </main>
         
      </SidebarProvider>
    // </NextThemesProvider>
  )
}

export default Layout