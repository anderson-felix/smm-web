import { ICrendentials, ICrendentialsResponse } from '../../interfaces/shared';
import { api } from '../../services/api';

type FuncType = (credentials: ICrendentials) => Promise<ICrendentialsResponse>;

export const signIn: FuncType = async credentials => {
  const { data } = await api.user.post('session', credentials);

  return data;
};
