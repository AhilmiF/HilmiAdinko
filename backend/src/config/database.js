// Database Connection Pool with Full Railway & Cloud Compatibility
const mysql = require('mysql2');
require('dotenv').config();

const getDbConfig = () => {
    // 1. Direct connection string URL provided by Railway or Cloud provider
    const connectionUrl = process.env.MYSQLURL || process.env.MYSQL_URL || process.env.DATABASE_URL;
    if (connectionUrl) {
        return connectionUrl;
    }

    // 2. Individual environment variables (Railway default names / standard DB names)
    return {
        host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
        user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USERNAME || 'root',
        password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
        database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'hilmiadinko',
        port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || '3306', 10),
        ssl: process.env.DB_SSL === 'false' ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
};

const config = getDbConfig();
const dbPool = typeof config === 'string' 
    ? mysql.createPool(config) 
    : mysql.createPool(config);

module.exports = dbPool.promise();