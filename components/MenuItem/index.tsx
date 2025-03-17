"use client";
import React from "react";
import Link from "next/link";
import { isExternal } from "@/utils/vaildate";
import { useRouter } from "next/navigation";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
const MenuItem = ({ path, title, icon, iconColor, iconActiveColor, onChange, selectedKey }: MenuItemProps & { onChange: (value: string) => void; }) => {
  const router = useRouter();
  const toPage = () => { 
    if (isExternal(path)) {
      window.open(path, "_blank");
      return
    }
    onChange(path)
    router.push(path)
  }
  return (
    <div>
      <SidebarMenuItem>
        <SidebarMenuButton className=" text-base !py-6   group-data-[collapsible=icon]:!size-10" tooltip={title} asChild   isActive={path === selectedKey} >
          <div onClick={toPage} className="flex cursor-pointer   w-full items-center">
            <div className=" flex items-center justify-center ">
            {/* style={{color: path===selectedKey?iconActiveColor:iconColor}} */}
            <div className={`iconify text-xl   ${icon} ml-0.5   ` } ></div>
            </div>
            <span>{title}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};
export default MenuItem;
