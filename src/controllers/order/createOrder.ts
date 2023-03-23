import { api } from '../../services/api';
import { ICreateOrderParams, IOrder } from '../../interfaces/order';

type FuncType = (params: ICreateOrderParams) => Promise<IOrder>;

export const createOrder: FuncType = async params => {
  const { data } = await api.user.post(`order/create`, params);

  return data;
};
