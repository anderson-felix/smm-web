import { IncomingMessage } from 'http';
import { api } from '../services/api';

interface NextRequest extends IncomingMessage {
  cookies: Record<string, unknown>;
}

export const updateApiTokenFromCookie = (req: NextRequest): void => {
  const { token } = req.cookies;

  api.user.defaults.headers.authorization = `Bearer ${token}`;
};
