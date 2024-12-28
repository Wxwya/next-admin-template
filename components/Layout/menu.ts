export const menu:SubMenuItemProps[] = [
  {
    path: "/",
    title: "首页",
    icon: "solar--asteroid-bold-duotone",
  },
  {
    path: "/about",
    title: "关于我们",
    icon: "solar--danger-bold",
  },
  {
    path: "/form",
    title: "表单",
    icon: "solar--asteroid-bold-duotone",
  },
  {
    path: "/table",
    title: "表格",
    icon: "solar--asteroid-bold-duotone",
  },
  {
    path: "/order",
    title: "订单管理",
    icon: "solar--database-bold",
    routes: [
      {
        path: "/order/list",
        title: "订单列表",
      },
      {
        path: "/order/info",
        title: "订单详情",
      }
    ],
  },
  {
    path: "/userCenter",
    title: "用户中心",
    icon: "solar--database-bold",
    routes: [
      {
        path: "/userCenter/user",
        title: "用户管理",
      },
      {
        path: "/userCenter/role",
        title: "角色管理",
      }
    ],
  },

  
]