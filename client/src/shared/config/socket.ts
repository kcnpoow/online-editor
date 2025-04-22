import { io } from 'socket.io-client';

// TODO: Extract URL into variable
export const socket = io('192.168.230.185:2222');
