import { api } from '../../services/api';
import { ISector, IUpdateSectorParams } from '../../interfaces/sector';

type FuncType = (params: IUpdateSectorParams) => Promise<ISector>;

export const createSector: FuncType = async ({ id, ...params }) => {
  const { data } = await api.user.patch(`sector/update/${id}`, params);

  return data;
};
