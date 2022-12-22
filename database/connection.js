const mysql = require("mysql")
const {promisify} = require("util")



const pool = mysql.createPool({
        host:"51.161.116.86",
        database:'grupo_pms',
        user:"grupo_pms",
        password:",IP7ORV^9LVY",
})

pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
      }
    }
    if (connection) connection.release();
    console.log('DB CONNECT');
  
    return;
  });
  
  // Promisify Pool Querys
  pool.query = promisify(pool.query);
  
  module.exports = {pool};
  