import { Address } from '../shared';

export interface ICustomer {
  id: string;
  created_by: string;
  name: string;
  description: string;
  federal_document: string;
  email: string;
  phone: string;
  address: Address;
}
