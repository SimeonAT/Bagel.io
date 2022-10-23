require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

exports.getMembers = async () => {
    const select = `SELECT * FROM member`;
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    // console.log(`rows: ${rows}`);
    return rows;
};

exports.getMemberScheduledTasks = async (username) => {
    const select = `SELECT taskpreset.taskname, taskpreset.tasktag, taskscheduled.starttime, taskscheduled.endtime, taskscheduled.complete 
                    FROM member, taskpreset, taskscheduled
                    WHERE member.username = $1
                        AND member.username = taskpreset.username
                        AND taskpreset.presetid = taskscheduled.presetid`;
    const query = {
        text: select,
        values: [username],
    };
    const {rows} = await pool.query(query);
    // console.log(`rows: ${rows}`);
    return rows[0];
};

exports.insertUser = async (username, email, password) => {
    const insert = `INSERT INTO member(username, email, memberpassword) 
                    VALUES ($1, $2, $3)`;
    const query = {
        text: insert,
        values: [username, email, password],
    };
    const {rows} = await pool.query(query);
    // console.log(`rows: ${rows}`);
    return rows;
};

exports.selectAll = async () => {
    const select = 'SELECT * FROM foobar';
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    return rows[0].thetime;
};















