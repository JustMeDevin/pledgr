const mysql = require('mysql');
const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

function connect() {
    var con = mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 3306,
        user: 'root',
        password: 'root' || 'secret',
        database: 'CrowdFund'
    });
    return con;
}