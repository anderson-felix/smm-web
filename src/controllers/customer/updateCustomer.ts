import { api } from '../../services/api';
import { ICustomer, IUpdateCustomerParams } from '../../interfaces/customer';

type FuncType = (params: IUpdateCustomerParams) => Promise<ICustomer>;

export const updateCustomer: FuncType = async ({ id, ...params }) => {
  const { data } = await api.user.patch(`customer/update/${id}`, params);

  return data;
};
