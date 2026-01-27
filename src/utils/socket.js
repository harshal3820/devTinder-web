import io from 'socket.io-client';
import { BASE_URL } from './constants';

export const createSocketConnection = () => {
  return io("/",{ path: "/api/socket.io "});
}