"use client"
import React, { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover'
import { Button} from "@/components/ui/button"
const XwyaPopover = ({ children, text, content = {},onConfirm }: { children: ReactNode; text: string, content: any,onConfirm:Function }) => {
  const [open, setOpen] = React.useState(false)
  const confirm = () => { 
    onConfirm() && setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent {...content}>
        <div>
          <div>{text}</div>
          <div className=' flex gap-2 justify-end mt-4'>
            <Button variant="destructive" size="sm" onClick={confirm}> 確定</Button>
            <Button onClick={ ()=>setOpen(false) } variant="outline" size="sm">取消</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default XwyaPopover
