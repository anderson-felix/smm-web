import { Address } from '../shared';

export interface ICreateCustomerParams {
  name: string;
  federal_document: string;
  description: string | null;
  email: string;
  phone: string;
  address: Address | null;
}
