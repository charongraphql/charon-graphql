const express = require('express');
const path = require('path');

const app = express();

const PORT = 3333;

app.use(express.static(path.resolve(__dirname, '../dist')));


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
