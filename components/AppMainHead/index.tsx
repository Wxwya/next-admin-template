import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { avatar } from '@/utils/settings'
import { useRouter } from 'next/navigation'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,Avatar, AvatarImage, AvatarFallback } from "@/rely/admin_ui"
type AppMainHeadProps = {
  link?: string
  href?: string
  page: string
}
const AppMainHead = ({ link, href, page }: AppMainHeadProps) => {
  const router = useRouter()
  return (
    <div className=" sticky  left-0 top-0 z-50 px-4 pr-8 w-full  bg-[hsl(var(--background))] flex items-center justify-between border-b border-sidebar-border">
      <div className="flex h-14  items-center gap-4">
        <SidebarTrigger />
        <div className=" w-px h-4  bg-sidebar-border"></div>
        <Breadcrumb>
          <BreadcrumbList>
            {link && href ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{link}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : null}
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-4 items-center">
              {avatar ? (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : null}
              <div>xwya</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom'>
            <DropdownMenuItem className=' !text-red-600' onClick={()=>router.push("/login")}  >
              <span className='iconify solar--square-share-line-broken'></span>
                <span> 退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AppMainHead
