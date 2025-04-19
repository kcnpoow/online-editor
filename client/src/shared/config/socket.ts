import { io } from 'socket.io-client';

// TODO: Extract URL into variable
export const socket = io('localhost:2222');
