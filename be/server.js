const express = require('express');
const router = require('./routes/route');
const mongoose = require('mongoose');
require('dotenv').config();

////
const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/v1', router);
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
