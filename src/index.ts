import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors({ origin: '*' }));

const PORT = Number(process.env.PORT) || 4000;

app.get('/', (_, res) => {
  res.send('Socket.IO サーバーが動いています');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', socket => {
  console.log('🔌 Client connected:', socket.id);
  socket.on('positionUpdate', data => io.emit('positionUpdate', data));
  socket.on('disconnect', () => console.log('❌ Client disconnected:', socket.id));
});

server.listen(PORT, () => {
  console.log(`⚡️ Socket.IO server running on port ${PORT}`);
});
