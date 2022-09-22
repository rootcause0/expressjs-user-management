const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.MYSQL_SERVER,
    port : process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    multipleStatements : true
  })

module.exports = {
    mysql,
    connection
}
