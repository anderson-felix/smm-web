import { Flag } from '../shared';
import { UserRoleType } from './UserRoleType';

export interface ICreateUserParams {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
  recent_flags: Flag[];
}
