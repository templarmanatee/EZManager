const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a55andtit5',
    database: 'employees_db'
})

dbConnection.connect((err) => {
    if (err) 
        throw err;  
});

module.exports = dbConnection;