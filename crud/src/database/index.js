"use strict"; 

var mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'admin',
  database : 'crud',
  port     : '3306',
  timezone: 'America/Recife'
});

module.exports = connection;