const Notification = require('../models/notifications.model');
let io = null;

function initializeSocket(instance) {
  io = instance;
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join-room', (roomId) => {
      console.log('Joining room:', roomId);
      socket.join(roomId);
    });

    socket.on('disconnect', () => {
      socket.rooms.forEach((room) => {
        socket.leave(room);
      });
      console.log('Client disconnected:', socket.id);
    });
  });
}

async function sendNotification(tenantId, userId, message) {
  await Notification.create({ tenantId, userId, message, isRead: false });
  console.log('tenantId', tenantId);
  if (io) io.to(tenantId.toString()).emit('notification', { message, timestamp: new Date() });
}

function refreshDashboard(tenantId) {
  if (io) io.to(tenantId.toString()).emit('refreshDashboard', true);
}

module.exports = { initializeSocket, sendNotification, refreshDashboard };
