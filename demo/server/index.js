require('dotenv').config();
const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// const cors = require('cors');


const app = express();

const { PORT } = process.env;
// app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use(express.static(path.resolve(__dirname, '../dist')));


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
