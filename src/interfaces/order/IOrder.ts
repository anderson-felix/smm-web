import { ICollaborator } from '../collaborator';
import { ISector } from '../sector';
import { File, Flag } from '../shared';
import { IOrderComment } from './IOrderComment';
import { OrderStatusType } from './OrderStatusType';

export interface IOrder {
  id: string;
  created_by: string;
  customer_id: string | null;
  display_name: string;
  description: string | null;
  status: OrderStatusType;
  files: File[];
  flags: Flag[];
  collaborators: ICollaborator[];
  sectors: OrderSector[];
  comments: IOrderComment[];
  customer: IOrderCustomer | null;
}

export type OrderSector = ISector & { estimated_hours: string | null };
export type IOrderCustomer = { name: string; id: string };
