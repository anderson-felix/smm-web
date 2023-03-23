import { ICreateUserParams } from './ICreateUserParams';

export interface IUpdateUserParams extends Partial<ICreateUserParams> {
  id: string;
}
