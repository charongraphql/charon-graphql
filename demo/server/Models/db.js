const pgp = require('pg-promise')();

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}

const db = pgp(cn);

db.any('SELECT * FROM listing')
  .then(data => console.log(data))
  .catch(err => console.log(err));

module.exports = db;