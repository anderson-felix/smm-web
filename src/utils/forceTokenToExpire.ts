import { ServerResponse } from 'http';

export const forceTokenToExpire = (res: ServerResponse): void => {
  res.setHeader(
    'Set-Cookie',
    'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
  );
};
