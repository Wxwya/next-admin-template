"use client"
import React, { ReactNode,useState } from 'react'
import { Button,Popover, PopoverContent, PopoverTrigger} from "@/rely/admin_ui"
const XwyaPopover = ({ children, text, content = {},onConfirm }: { children: ReactNode; text: string, content: any,onConfirm:Function }) => {
  const [open, setOpen] = useState(false)
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
