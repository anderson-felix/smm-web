import { api } from '../../services/api';
import { IOrder } from '../../interfaces/order';
import { IPagingResponse, IPagingQueryParams } from '../../interfaces/shared';
import { buildQueryParams } from '../../utils';

type FuncType = (
  params?: IPagingQueryParams,
) => Promise<IPagingResponse<IOrder>>;

export const listOrders: FuncType = async (params = {}) => {
  params.sort ||= 'updated_at';
  params.order ||= 'DESC';
  const query = buildQueryParams(params);

  const { data } = await api.user.get(`order/list?${query}`);

  return data;
};
