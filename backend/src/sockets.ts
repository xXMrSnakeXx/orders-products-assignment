import { Server } from 'socket.io';
import {
  incrementClients,
  decrementClients,
  getConnectedClients,
} from './utils/sessionCounter.js';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    const total = incrementClients();
    console.log(`🟢 New client connected: ${socket.id}. Total: ${total}`);
    io.emit('activeSessions', getConnectedClients());

    socket.on('disconnect', () => {
      const total = decrementClients();
      console.log(`🔴 Client disconnected: ${socket.id}. Total: ${total}`);
      io.emit('activeSessions', getConnectedClients());
    });
  });
};
