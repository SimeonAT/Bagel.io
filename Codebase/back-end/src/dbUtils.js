// require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

/** 
 * Returns all users in DB
 * 
 * @returns  - List of users
 */
exports.getMembers = async () => {
    const select = `SELECT * FROM member`;
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    return rows;
};

/** 
 * Returns list of tasks for user
 * 
 * @param username - unique user identifier
 * @returns - List of all tasks for user
 */
exports.getMemberScheduledTasks = async (username) => {
    const select = `SELECT taskpreset.taskname, taskpreset.tasktag, taskscheduled.starttime, taskscheduled.endtime, taskscheduled.complete, taskscheduled.scheduledid, taskscheduled.checkedin
                    FROM member, taskpreset, taskscheduled
                    WHERE member.username = $1
                        AND member.username = taskpreset.username
                        AND taskpreset.presetid = taskscheduled.presetid`;
    const query = {
        text: select,
        values: [username],
    };
    const {rows} = await pool.query(query);
    return rows;
};

/** 
 * Creates new user
 * 
 * @param username - unique name for user
 * @param email - user's email address 
 * @param password - user's password
 * @returns - payload with saved info
 */
exports.insertUser = async (username, email, password) => {
    const insert = `INSERT INTO member(username, email, memberpassword) 
                    VALUES ($1, $2, $3)`;
    const query = {
        text: insert,
        values: [username, email, password],
    };
    const {rows} = await pool.query(query);
    return rows;
};

/** 
 * Creates new task
 * 
 * @param taskData - all of the fields present on task object
 * @returns - created task object
 */
exports.insertTask = async (username, taskName, startDate, endDate, tagName, presetid, scheduledid) => {
    let insert = `INSERT INTO taskpreset(taskname, presetid, tasktag, username) 
                  VALUES ($1, $2, $3, $4)
                  RETURNING *`;
    let query = {
        text: insert,
        values: [taskName, presetid, tagName, username]
    };
    let preset = await pool.query(query);
    insert = `INSERT INTO taskscheduled(starttime, scheduledid, endtime, complete, checkedin, presetid) 
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *`;
    query = {
        text: insert,
        values: [startDate, scheduledid, endDate, 'false', 'false', presetid]
    };
    let scheduled = await pool.query(query);
    return [preset.rows[0], scheduled.rows[0]];
};

/** 
 *  Selects all. Test function
 * 
 * @returns - the time
 */
exports.selectAll = async () => {
    const select = 'SELECT * FROM foobar';
    const query = {
        text: select,
        values: [],
    };
    const {rows} = await pool.query(query);
    return rows[0].thetime;
};

/** 
 * Deletes tasks from DB.
 * 
 * @param  taskId - unique id of task to remove
 * @returns - deleted task
 */
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

/** 
 * Replaces task info with new info
 * All fields get replaced
 * 
 * @param taskData - all the fields present on task object
 * @returns undefined - No return value
 */
exports.updateTask = async (taskId, startDate, endDate, tag, complete, checkedin) => {
    let update = `UPDATE taskscheduled
                  SET starttime = $1, endtime = $2, complete = $3, checkedin = $4
                  WHERE scheduledid = $5
                  RETURNING presetid`;
    let query = {
        text: update,
        values: [startDate, endDate, complete, checkedin, taskId],
    }
    const scheduled = await pool.query(query);
    update = `UPDATE taskpreset
              SET tasktag = $1
              WHERE presetid = $2`;
    query = {
        text: update,
        values: [tag, scheduled.rows[0].presetid],
    }
    await pool.query(query);
    return;
}

/** 
 * Returns list of categories that user has used
 * Deprecated due to lack of time
 * 
 * @param username - unique identfier of user
 * @returns - Array of strings
 */
exports.getUserTags = async (username) => {
    let select = `SELECT taskpreset.tasktag
                  FROM member, taskpreset
                  WHERE member.username = $1
                        AND member.username = taskpreset.username`;
    let query = {
        text: select,
        values: [username],
    }
    const {rows} = await pool.query(query);
    return rows[0];
};


