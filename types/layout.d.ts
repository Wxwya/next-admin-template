type BaseMenuItemProps = {
  path: string;
  title: string;
  icon?: React.ReactNode | string;
  iconColor?: string;
  iconActiveColor?: string;
  selectedKey?: string;
  menuGroupKeys?:string[]
};

type MenuItemProps = BaseMenuItemProps;

type SubMenuItemProps = BaseMenuItemProps & {
  routes?: MenuItemProps[];
};