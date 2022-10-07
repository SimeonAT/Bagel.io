const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 8000,
    user: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

const selectAll = async () => {
    const select = `SELECT *
                    FROM foobar`;
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    return rows[0].thetime;
}

exports.get = async (req, res) => {
    res.status(200).json({displayStr: `Current Date: ${new Date().toISOString}, 
        First DB Entry Inserted At: ${await selectAll()}`});
};













