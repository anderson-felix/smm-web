import { ICreateCustomerParams } from './ICreateCustomerParams';

export interface IUpdateCustomerParams extends Partial<ICreateCustomerParams> {
  id: string;
}
