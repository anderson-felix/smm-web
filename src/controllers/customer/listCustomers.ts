import { api } from '../../services/api';
import { IPagingResponse, IPagingQueryParams } from '../../interfaces/shared';
import { buildQueryParams } from '../../utils';
import { ICustomer } from '../../interfaces/customer';

type FuncType = (
  params?: IPagingQueryParams,
) => Promise<IPagingResponse<ICustomer>>;

export const listCustomers: FuncType = async (params = {}) => {
  params.sort ||= 'name';
  const query = buildQueryParams(params);

  const { data } = await api.user.get(`customer/list?${query}`);

  return data;
};
