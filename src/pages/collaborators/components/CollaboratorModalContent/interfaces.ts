import { ICollaborator } from '../../../../interfaces/collaborator';
import { ISector } from '../../../../interfaces/sector';
import { IUser } from '../../../../interfaces/user';

export interface ICollaboratorModalContentProps {
  user: IUser;
  collaborator: ICollaborator;
  sectors: ISector[];
  setCollaborator: React.Dispatch<React.SetStateAction<ICollaborator>>;
  errors?: {
    name?: string;
    email?: string;
    federal_document?: string;
    phone?: string;
  };
}
