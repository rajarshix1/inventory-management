const express = require('express');
const router = require('./routes/route');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected', process.env.MONGO_URI))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/v1', router);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
