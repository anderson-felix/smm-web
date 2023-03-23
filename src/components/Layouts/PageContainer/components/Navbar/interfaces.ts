import type { MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { IconType } from 'react-icons';

export interface INavbarProps {
  page?: string;
}

export interface INavbarMenuOption {
  label: string;
  icon: IconType;
  location?: string;
}

export type NavbarMenuType = { [page: string]: INavbarMenuOption };

type MenuItemType = ItemType & {
  page?: string;
  children?: MenuItemType[];
};

interface MenuItemProps extends MenuProps {
  items: MenuItemType[];
}

export type MenuItem = Required<MenuItemProps>['items'][number];
