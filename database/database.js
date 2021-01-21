const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./config');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('La conexión con la base de datos fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('La base de datos tiene muchas conexiones.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('La conexión fue rechazada.');
        } 
    }

    if (connection) connection.release();
    console.log('La base de datos está conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;