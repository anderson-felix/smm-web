import { api } from '../../services/api';
import { ICreateUserParams, IUser } from '../../interfaces/user';

type FuncType = (params: ICreateUserParams) => Promise<IUser>;

export const createUser: FuncType = async params => {
  const { data } = await api.user.post(`user/create`, params);

  return data;
};
