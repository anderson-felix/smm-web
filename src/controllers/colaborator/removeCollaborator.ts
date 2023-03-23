import { api } from '../../services/api';

type FuncType = (id: string) => Promise<void>;

export const removeCollaborator: FuncType = async id => {
  await api.user.delete(`collaborator/delete/${id}`);
};
