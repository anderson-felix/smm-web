import { api } from '../../services/api';

type FuncType = (id: string) => Promise<void>;

export const removeSector: FuncType = async id => {
  await api.user.delete(`sector/delete/${id}`);
};
