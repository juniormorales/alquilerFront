import { ChildrenItems } from './IChildrenItems';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  orden?:number;
  children?: ChildrenItems[];
}