import { ICollaborator } from '../collaborator';

export interface ISector {
  id: string;
  created_by: string;
  display_name: string;
  description: string | null;
  color: string | null;
  collaborators: ICollaborator[];
}
