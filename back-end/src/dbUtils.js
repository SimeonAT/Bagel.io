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

exports.getMemberScheduledTasks = async (emailAddress) => {
    const select = `SELECT taskpreset.taskname, taskpreset.tasktag, taskscheduled.starttime, taskscheduled.endtime 
                    FROM member, taskpreset, taskscheduled
                    WHERE member.emailaddress = $1
                        AND taskpreset.presetid = taskscheduled.presetid
                        AND member.emailaddress = taskpreset.emailaddress`;
    const query = {
        text: select,
        values: [emailAddress],
    };
    const {rows} = await pool.query(query);
    // console.log(`rows: ${rows}`);
    return rows;
};













