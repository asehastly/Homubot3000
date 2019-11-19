require('dotenv-flow').config();
const mysql = require('mysql');

let con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'homu',
    charset : 'utf8mb4'
});

con.connect(err => {
    if(err) throw err;
    console.log('connected to homu database');
    //con.query('SHOW TABLES', console.log);
});

module.exports = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    con
}