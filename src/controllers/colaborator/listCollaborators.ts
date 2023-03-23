import { api } from '../../services/api';
import { IPagingResponse, IPagingQueryParams } from '../../interfaces/shared';
import { buildQueryParams } from '../../utils';
import { ICollaborator } from '../../interfaces/collaborator';

type FuncType = (
  params?: IPagingQueryParams,
) => Promise<IPagingResponse<ICollaborator>>;

export const listCollaborators: FuncType = async (params = {}) => {
  params.sort ||= 'name';
  const query = buildQueryParams(params);

  const { data } = await api.user.get(`collaborator/list?${query}`);

  return data;
};
