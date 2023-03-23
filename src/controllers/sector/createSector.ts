import { api } from '../../services/api';
import { ICreateSectorParams, ISector } from '../../interfaces/sector';

type FuncType = (params: ICreateSectorParams) => Promise<ISector>;

export const createSector: FuncType = async params => {
  const { data } = await api.user.post(`sector/create`, params);

  return data;
};
