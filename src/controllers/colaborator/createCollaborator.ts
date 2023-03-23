import { api } from '../../services/api';
import {
  ICreateCollaboratorParams,
  ICollaborator,
} from '../../interfaces/collaborator';

type FuncType = (params: ICreateCollaboratorParams) => Promise<ICollaborator>;

export const createCollaborator: FuncType = async params => {
  const { data } = await api.user.post(`collaborator/create`, params);

  return data;
};
