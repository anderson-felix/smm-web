import { ISectorData } from '../sector';
import { File, Flag } from '../shared';
import { OrderStatusType } from './OrderStatusType';

export interface ICreateOrderParams {
  sectors: ISectorData[];
  collaborator_ids: string[];
  display_name: string;
  customer_id: string | null;
  description: string | null;
  status: OrderStatusType;
  files: File[];
  flags: Flag[];
}
