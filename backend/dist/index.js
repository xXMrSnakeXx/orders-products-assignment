import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { setupSocket } from './sockets.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`),
});
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
const PORT = Number(process.env.PORT) || 4000;
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
setupSocket(io);
server.listen(PORT, () => {
    console.log('first', process.env.NODE_ENV);
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
