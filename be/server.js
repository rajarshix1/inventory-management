const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routes/route');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeSocket } = require('./utils/socket');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected', process.env.MONGO_URI))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

initializeSocket(io);

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
