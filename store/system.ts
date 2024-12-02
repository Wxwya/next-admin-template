import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createSelectors } from "@/utils/createStore";

class StoreState  {
  theme:string = "dark" // 默认深色主题
  menuGroupKeys: string[] = [] // 菜单组
  collapsed:boolean= true
}
const useSystemStore = create<StoreState>()(
  immer(
    persist(
      () => (new StoreState()),
      {
        name: "systemSrore",
      }
    )
  )
);

export const onChangeMenuGroupKeys = (path: string,pushFlag?:boolean) => { 
  useSystemStore.setState(state => { 
    let menuGroupKeys = state.menuGroupKeys
    const flag = state.menuGroupKeys.includes(path)
   
    if (path || pushFlag) { 
      menuGroupKeys=[...menuGroupKeys, path]
    }
    if (flag && !pushFlag) {
      return {
        ...state,
        menuGroupKeys:state.menuGroupKeys.filter(item => item !== path)
      }
    } 
    return {
      ...state,
      menuGroupKeys
    }
  })
}
export const onChangeCollapsed = (collapsed:boolean) => {
  useSystemStore.setState(state => {
    return {
      ...state,
      collapsed
    }
  })
}
export default useSystemStore