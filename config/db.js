const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",                   // root user
  password: "Deepak@20041909",    // your root password
  database: "ImageAnnotation",    // your database
  connectionLimit: 10,
});

module.exports = pool;
