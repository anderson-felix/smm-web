import { api, ApiDomainType } from '../../services/api';

type FuncType = (
  comment_id: string,
  apiDomainType?: ApiDomainType,
) => Promise<void>;

export const deleteComment: FuncType = async (comment_id, domain = 'user') => {
  await api[domain].delete(`comment/delete/${comment_id}`);
};
