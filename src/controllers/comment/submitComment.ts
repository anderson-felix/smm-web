import { api, ApiDomainType } from '../../services/api';
import { ISubmitCommentParams } from '../../interfaces/comment';

type FuncType = (
  params: ISubmitCommentParams,
  apiDomainType?: ApiDomainType,
) => Promise<void>;

export const submitComment: FuncType = async (params, domain = 'user') => {
  await api[domain].post(`/comment/submit`, params);
};
