require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT;

app.use(express.static(path.resolve(__dirname, '../dist')));


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
