'use client'
import React, { useEffect, useState } from 'react'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { Portal } from '@radix-ui/react-dialog'
const options: Option[] = [
  { label: '极简', value: 'light' },
  { label: '极简黑', value: 'dark' },
  { label: '跟随系统', value: 'system' },
]
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const AppSidebarFoot = () => {
  const { theme, setTheme } = useTheme()
  const [icon, setIcon] = useState('solar--sun-bold')
  const onChange = (value: string) => {
    getSystemTheme(value)
    setTheme(value)
  }
  const getSystemTheme = () => {
    if ((theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || theme === 'dark') {
      setIcon('solar--moon-bold')
      return
    }
    setIcon('solar--sun-bold')
  }
  // 监听系统主题变化
  const handleThemeChange = (event: MediaQueryListEvent) => {
    if (theme === 'system') {
      setTheme(event.matches ? 'dark' : 'light')
    }
  }
  useEffect(() => {
    getSystemTheme()
    darkModeMediaQuery.addEventListener('change', handleThemeChange)
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [theme])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className=' justify-center'>
          <div className=" size-10 cursor-pointer flex justify-center items-center">
            <span className={`iconify text-2xl ${icon}`}></span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" sideOffset={10}>
        {options.map((item) => (
          <DropdownMenuItem onClick={() => onChange(item.value)} key={item.value}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppSidebarFoot
