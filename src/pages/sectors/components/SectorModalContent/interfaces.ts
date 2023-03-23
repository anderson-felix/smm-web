import { ISector } from '../../../../interfaces/sector';
import { IUser } from '../../../../interfaces/user';

export interface IOrderModalContentProps {
  user: IUser;
  sector: ISector;
  setSector: React.Dispatch<React.SetStateAction<ISector>>;
  errors?: {
    display_name?: string;
  };
}
