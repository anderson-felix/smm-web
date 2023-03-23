import { api } from '../../services/api';
import { IUser, IUpdateUserParams } from '../../interfaces/user';

type FuncType = (params: IUpdateUserParams) => Promise<IUser>;

export const updateUser: FuncType = async ({ id, ...params }) => {
  const { data } = await api.user.patch(`user/update/${id}`, params);

  return data;
};
