import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import { Socket } from 'socket.io';

import { Unauthorized, Forbidden } from './errors';
import { config } from './config';

const checkRole = (...allowed: string[]) => {
  const isAllowed = (role: string) => allowed.indexOf(role) > -1;
  return (socket: Socket | any, next: any) => {
    const token = get(socket, 'request.access-token');
    if (!token) {
      throw new Unauthorized('No token provided');
    }
    const { secretKey } = config.jwt;
    try {
      const decoded: any = jwt.verify(token, secretKey);
      if (decoded && isAllowed(decoded.role)) {
        // eslint-disable-next-line no-param-reassign
        socket.locals.user = decoded; // DOCS: Assign decoded data to socket variable for using local request.
        next();
      } else {
        next(new Forbidden('Your role is not allowed'));
      }
    } catch (err) {
      next(new Unauthorized('Invalid access token'));
    }
  };
};

export { checkRole };
