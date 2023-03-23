import { ICreateSectorParams } from './ICreateSectorParams';

export interface IUpdateSectorParams extends Partial<ICreateSectorParams> {
  id: string;
}
