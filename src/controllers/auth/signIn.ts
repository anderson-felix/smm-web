import { ICrendentials, ICrendentialsResponse } from '../../interfaces/shared';
import { api, ApiDomainType } from '../../services/api';

type FuncType = (
  credentials: ICrendentials,
  apiDomainType?: ApiDomainType,
) => Promise<ICrendentialsResponse>;

export const signIn: FuncType = async (credentials, domain = 'user') => {
  const { data } = await api[domain].post('session', credentials);

  return data;
};
