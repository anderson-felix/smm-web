import { ISector } from '../sector';
import { Address, Flag } from '../shared';

export interface ICollaborator {
  id: string;
  created_by: string;
  name: string;
  description: string | null;
  federal_document: string;
  email: string;
  phone: string;
  hourly_price: string | null;
  address: Address | null;
  recent_flags: Flag[];
  sectors: ISector[];
}
