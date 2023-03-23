import { api } from '../../services/api';
import { IUser, IUpdateUserParams } from '../../interfaces/user';

type FuncType = (params: Omit<IUpdateUserParams, 'id'>) => Promise<IUser>;

export const updateProfile: FuncType = async params => {
  const { data } = await api.user.patch(`user/update`, params);

  return data;
};
