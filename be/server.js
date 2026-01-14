const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
