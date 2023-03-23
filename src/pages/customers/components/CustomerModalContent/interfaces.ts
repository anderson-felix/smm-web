import { ICustomer } from '../../../../interfaces/customer';
import { IUser } from '../../../../interfaces/user';

export interface ICustomerModalContentProps {
  user: IUser;
  customer: ICustomer;
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>;
  errors?: {
    name?: string;
    email?: string;
    federal_document?: string;
    phone?: string;
  };
}
