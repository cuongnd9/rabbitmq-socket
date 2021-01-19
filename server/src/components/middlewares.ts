import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import { Socket } from 'socket.io';

import { Unauthorized, Forbidden } from './errors';
import { config } from './config';

const checkRole = (...allowed: string[]) => (socket: Socket | any, next: any) => {
  const token = get(socket, 'handshake.headers.access-token');
  if (!token) {
    throw new Unauthorized('No token provided');
  }
  const { secretKey } = config.jwt;
  try {
    const decoded: any = jwt.verify(token, secretKey);
    const roles: string[] = get(decoded, 'account.roles') || [];
    const isAllowed = roles.find((role) => allowed.indexOf(role) > -1);
    if (isAllowed) {
      // eslint-disable-next-line no-param-reassign
      socket.user = decoded; // DOCS: Assign decoded data to socket variable for using local request.
      next();
    } else {
      next(new Forbidden('Your role is not allowed'));
    }
  } catch (err) {
    next(new Unauthorized('Invalid access token'));
  }
};

export { checkRole };
