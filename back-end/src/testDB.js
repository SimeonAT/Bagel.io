require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

const selectAll = async () => {
    const select = 'SELECT * FROM foobar';
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    return rows[0].thetime;
};

exports.get = async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const queryResult = await selectAll();
    response.status(200).json({displayStr: `Miliseconds Since 1970: [${new Date().getTime()}], 
        First DB Entry Inserted At: [${queryResult}]`});
};













