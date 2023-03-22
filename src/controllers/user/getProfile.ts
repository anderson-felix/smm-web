import { IUser } from '../../interfaces/user';
import { api } from '../../services/api';

type FuncType = () => Promise<IUser>;

export const getProfile: FuncType = async () => {
  const { data } = await api.user.get('profile');

  return data;
};
