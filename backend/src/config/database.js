// Requirement untuk koneksi ke DB
const mysql = require('mysql2');
require('dotenv').config();

// Connection pool ke DB
const dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hilmiadinko',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = dbPool.promise();