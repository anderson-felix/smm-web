import { api } from '../../services/api';
import {
  ICollaborator,
  IUpdateCollaboratorParams,
} from '../../interfaces/collaborator';

type FuncType = (params: IUpdateCollaboratorParams) => Promise<ICollaborator>;

export const updateCollaborator: FuncType = async ({ id, ...params }) => {
  const { data } = await api.user.patch(`collaborator/update/${id}`, params);

  return data;
};
