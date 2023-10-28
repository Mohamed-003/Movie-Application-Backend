const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345678',
    port: 5432,
});

async function CreateTable() {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS movies (
            id serial PRIMARY KEY,
            email TEXT,
            password TEXT,
            "movie list"  jsonb[]
        )
        `);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

async function ConnectDb() {
    try {
        await pool.connect();
        console.log("Connected to Postgresql-DB!")
    } catch (error) {
        console.log("Error : ", error)
    }
}

module.exports = { pool, ConnectDb, CreateTable }