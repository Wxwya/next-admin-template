"use client";
import React from "react";
import {Collapsible,CollapsibleTrigger,CollapsibleContent} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,  useSidebar } from "@/components/ui/sidebar";
import { onChangeMenuGroupKeys } from "@/store/system";
import { useRouter } from "next/navigation";
import { isExternal } from "@/utils/vaildate";
const SubMenuItem = ({path,title,icon,routes,iconColor,selectedKey,onChange = () => { },menuGroupKeys =[]}: SubMenuItemProps& {onChange: (value: string) => void;}) => {
  const router = useRouter();
  const { open } = useSidebar();
  const selectSubItemKey = (subPath: string) => {
    if (isExternal(subPath)) {
      window.open(subPath, "_blank");
      return
    }
    onChange(subPath)
    router.push(subPath);
  }
  const onOpenChange = () => { 
  onChangeMenuGroupKeys(path)
  }
  return (
    <Collapsible open={menuGroupKeys.includes(path)} onOpenChange={onOpenChange}  className="group/collapsible">
      <SidebarMenuButton  tooltip={title} className=" text-base !py-6 group-data-[collapsible=icon]:!size-10"  asChild>
        <CollapsibleTrigger  className="w-full flex  justify-between items-center">
          <div className={`flex  items-center  gap-2 ${open?'gap-2':'gap-4'} `}>
            <div className=" flex  items-center justify-center">
            <span className={`iconify text-xl ml-0.5 ${icon}`}  style={{ color: iconColor }}  />
            </div>
            <span>{title}</span>
          </div>
          <span className=" transition-transform iconify solar--alt-arrow-right-linear group-data-[state=open]/collapsible:rotate-90"></span>
        </CollapsibleTrigger>
      </SidebarMenuButton>
      <CollapsibleContent>
        <SidebarMenuSub>
          {routes?.map((item) => (
            <SidebarMenuSubItem key={item.path}>
              <SidebarMenuSubButton
                className=" cursor-pointer text-base !py-6 !px-4"
                isActive={item.path === selectedKey}
                onClick={() => selectSubItemKey(item.path)}
              >
                {item.title}
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};
export default SubMenuItem;
