import { ICreateCollaboratorParams } from './ICreateCollaboratorParams';

export interface IUpdateCollaboratorParams
  extends Partial<ICreateCollaboratorParams> {
  id: string;
}
