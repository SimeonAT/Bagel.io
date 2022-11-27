const fs = require('fs');
const {Pool} = require('pg');

require('dotenv').config();
process.env.POSTGRES_DB='test';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

const runSQL = async (file) => {
    const content = fs.readFileSync(file, 'utf8');
    const statements = content.split(/\r?\n/);
    for (statement of statements) {
        await pool.query(statement);
    }
    // let myResult = await pool.query('SELECT * FROM member');
};

exports.resetDB = async () => {
    await runSQL('sql/schema.sql');
    await runSQL('sql/data.sql');
    await runSQL('sql/indexes.sql');
};

exports.testQuery = async () => {
    const {rows} = await pool.query('SELECT * FROM member');
    // console.log('gothere4');
    // console.log(rows);
    return rows;
}