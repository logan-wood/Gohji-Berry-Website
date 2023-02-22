const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: "./.env"})

var db

if (process.env.DB_USE_SSL === 'true') {
    // use ssl
    console.log('database.js: using ssl')
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: require
    })
} else {
    // do not use ssl
    console.log('database.js: not using ssl')
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
}

module.exports = db;



