import { api } from '../../services/api';
import { IOrder } from '../../interfaces/order';
import { IPagingResponse, IPagingQueryParams } from '../../interfaces/shared';
import { buildQueryParams } from '../../utils';

type FuncType = (
  params?: IPagingQueryParams,
) => Promise<IPagingResponse<IOrder>>;

export const listSectors: FuncType = async (params = {}) => {
  params.sort ||= 'display_name';
  const query = buildQueryParams(params);

  const { data } = await api.user.get(`sector/list?${query}`);

  return data;
};
