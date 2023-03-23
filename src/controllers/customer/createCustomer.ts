import { api } from '../../services/api';
import { ICreateCustomerParams, ICustomer } from '../../interfaces/customer';

type FuncType = (params: ICreateCustomerParams) => Promise<ICustomer>;

export const createCustomer: FuncType = async params => {
  const { data } = await api.user.post(`customer/create`, params);

  return data;
};
