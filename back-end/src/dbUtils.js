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
    const select = `SELECT taskpreset.taskname, taskpreset.tasktag, taskscheduled.starttime, taskscheduled.endtime, taskscheduled.complete, taskscheduled.scheduledid 
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
    return rows;
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

exports.insertTask = async (username, taskName, startDate, endDate, tagName, presetid, scheduledid) => {
    let insert = `INSERT INTO taskpreset(taskname, presetid, tasktag, username) 
                  VALUES ($1, $2, $3, $4)
                  RETURNING *`;
    let query = {
        text: insert,
        values: [taskName, presetid, tagName, username]
    };
    let preset = await pool.query(query);
    insert = `INSERT INTO taskscheduled(starttime, scheduledid, endtime, complete, presetid) 
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *`;
    query = {
        text: insert,
        values: [startDate, scheduledid, endDate, 'false', presetid]
    };
    let scheduled = await pool.query(query);
    return [preset.rows[0], scheduled.rows[0]];
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

exports.deleteTask = async (taskId) => {
    const deleteSQL = `DELETE FROM taskscheduled
                       WHERE tasksched.taskid = $1
                       RETURNING taskscheduled.presetid`;
    const query = {
        text: deleteSQL,
        values: [taskId]
    }
    const {rows} = await pool.query(query);
    return rows;
}

exports.updateTask = async (taskId, startDate, endDate, tag, complete) => {
    let update = `UPDATE taskscheduled
                  SET taskscheduled.starttime = $1, taskscheduled.endtime = $2, taskscheduled.complete = $3
                  WHERE taskscheduled.scheduledid = $4
                  RETURNING taskscheduled.presetid`;
    let query = {
        text: update,
        values: [startDate, endDate, complete, taskId],
    }
    const scheduled = await pool.query(query);
    console.log("dbUtils.js:102 "+scheduled.rows[0].presetid);
    update = `UPDATE taskpreset
              SET taskpreset.tasktag = $1
              WHERE taskpreset.presetid = $2`;
    query = {
        text: update,
        values: [tag, scheduled.rows[0].presetid],
    }
    await pool.query(query);
    return;
}

//New Request for function:
//exports.updateTask(taskId, startDate, endDate, tag, complete)
/*  please :)  */















