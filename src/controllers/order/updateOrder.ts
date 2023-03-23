import { api } from '../../services/api';
import { IOrder, IUpdateOrderParams } from '../../interfaces/order';

type FuncType = (params: IUpdateOrderParams) => Promise<IOrder>;

export const updateOrder: FuncType = async ({ id, ...params }) => {
  const { data } = await api.user.patch(`order/update/${id}`, params);

  return data;
};
