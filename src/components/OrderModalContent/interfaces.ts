import { ISubmitCommentParams } from '../../interfaces/comment';
import { ICustomer } from '../../interfaces/customer';
import { IOrder } from '../../interfaces/order';
import { ISector } from '../../interfaces/sector';
import { IUser } from '../../interfaces/user';

export interface IOrderModalContentProps {
  user: IUser;
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>;
  sectors: ISector[];
  customers: ICustomer[];
  onSubmitComment: (params: ISubmitCommentParams) => void;
  errors?: {
    display_name?: string;
  };
}
