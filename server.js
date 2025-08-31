const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketio = require('socket.io');
const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketio(server);

  io.on('connection', (socket) => {
    socket.on('message', async (msg) => {
      // Save message to DB with status SENT
      const savedMsg = await prisma.message.create({
        data: {
          content: msg.content,
          senderId: msg.sender,
          receiverId: msg.receiver || '',
          status: 'SENT'
        }
      });
      // Create notification for receiver
      if (msg.receiver) {
        await prisma.notification.create({
          data: {
            userId: msg.receiver,
            type: 'message',
            content: `New message from ${msg.sender}`
          }
        });
      }
      // Emit message with status SENT
      io.emit('message', { ...msg, status: 'SENT', id: savedMsg.id });
    });

    socket.on('delivered', async (msgId) => {
      // Update message status to DELIVERED
      await prisma.message.update({
        where: { id: msgId },
        data: { status: 'DELIVERED' }
      });
      io.emit('status', { id: msgId, status: 'DELIVERED' });
    });

    socket.on('read', async (msgId) => {
      // Update message status to READ
      await prisma.message.update({
        where: { id: msgId },
        data: { status: 'READ' }
      });
      io.emit('status', { id: msgId, status: 'READ' });
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
