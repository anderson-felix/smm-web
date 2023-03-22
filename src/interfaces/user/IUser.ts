import { UserRoleType } from '.';
import { Flag } from '../shared';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  recent_flags: Flag[];
}
