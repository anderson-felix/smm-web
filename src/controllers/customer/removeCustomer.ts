import { api } from '../../services/api';

type FuncType = (id: string) => Promise<void>;

export const removeCustomer: FuncType = async id => {
  await api.user.delete(`customer/delete/${id}`);
};
