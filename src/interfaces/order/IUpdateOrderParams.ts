import { ICreateOrderParams } from './ICreateOrderParams';

export interface IUpdateOrderParams extends Partial<ICreateOrderParams> {
  id: string;
}
