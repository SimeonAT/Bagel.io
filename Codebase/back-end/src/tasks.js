const sendError = require("./sendError");
const dbUtils = require("./dbUtils");
const { v4: uuidv4 } = require('uuid');

/** 
 * Creates new user in DB
 * 
 * @param request: {username:"", email:"", password:""}
 * @param response - HTTP response object to send to client
 * @returns - {loginAllowed: true, payload: {}} if success, {loginAllowed: false} otherwise
 */
exports.register = async (request, response) => {
  try {
    // set response headers
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    // get username/email/password from request body
    const registerReqBody = request.body;
    // console.log('json.stringify(registerReqBody)'+console.log(JSON.stringify(registerReqBody)));
    // check if username/email in db
    const users = await dbUtils.getMembers();
    let alreadyInUse = false;
    let checkUsername = ""; //if there is a match one or more of these will be filled.
    let checkEmail = "";
    for (const userObj of users) {
      if (userObj.username === registerReqBody.username || userObj.email === registerReqBody.email) {
        alreadyInUse = true;
        checkUsername = userObj.username;
        checkEmail = userObj.email;
        break;
      }
    }
    // if username/email in db: send failure, else: insert and send success
    if (alreadyInUse) {
      let emailUsed = "";
      let boolEmailUsed = false;
      let usernameUsed = "";
      let boolUsernameUsed = false;
      //check if username already used
      if (checkUsername === registerReqBody.username) {
        usernameUsed = "This username has already been used.";
        boolUsernameUsed = true;
      }
      //check if email already used
      if (checkEmail === registerReqBody.email) {
        emailUsed = "This email has already been used.";
        boolEmailUsed = true;
      }
      response.send({
        loginAllowed: false,
        boolEmailUsed: boolEmailUsed,
        emailUsed: emailUsed, //these two fields return error message of whether or not email/user has already been used.
        boolUsernameUsed: boolUsernameUsed,
        usernameUsed: usernameUsed
      });
    } else {
      await dbUtils.insertUser(registerReqBody.username, registerReqBody.email, registerReqBody.password);
      response.send({
        loginAllowed: true,
        payload: {
          "username": registerReqBody.username,
          "password": registerReqBody.password,
          "email": registerReqBody.email,
          "tasks": [],
        }
      });
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}

/** 
 * Compares given username & password with the usernames & passwords in db
 * Logs in User
 * 
 * @param request: {username:"", email:"", password:""}
 * @param response - HTTP response object to send to client
 * @returns - {loginAllowed: true, payload: {}} if match, {loginAllowed: false} if no match
 */
exports.loginDatabase = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const loginReqBody = request.body;
    // get users from db
    const users = await dbUtils.getMembers();
    // check if user in db
    let theUser = null;
    let userInDatabase = false;
    let usernameError = true;
    let passwordError = false;
    for (const userObj of users) {
      if (userObj.username === loginReqBody.username && userObj.memberpassword === loginReqBody.password) {
        userInDatabase = true;
        theUser = userObj;
        break;
      }
      
      if(userObj.username === loginReqBody.username) {
        usernameError = false; //username exists
        if(userObj.memberpassword != loginReqBody.password) {
          passwordError = true; //password is wrong.
        }
      }
    }
    if (userInDatabase) {
      // get tasks from db
      let theUserTasks = await dbUtils.getMemberScheduledTasks(theUser.username);
      // make task array
      const taskArray = [];
      for (const task of theUserTasks) {
        taskArray.push({
          "name": task.taskname,
          "startDate": task.starttime,
          "endDate": task.endtime,
          "tag": task.tasktag,
          "complete": task.complete,
          "checkedIn": task.checkedin,
          "taskid": task.scheduledid,
        })
      }
      // send response with user info in body
      response.send({
        loginAllowed: true,
        payload: {
          "username": theUser.username,
          "password": theUser.memberpassword,
          "email": theUser.email,
          "tasks": taskArray,
        }
      });
    } else {
      response.send({loginAllowed: false,
                     password: passwordError,
                     username: usernameError
                    });
    }
  } catch (error) {
    sendError.sendError(error, response);
  }
}

/** 
 * Get task list from DB using username as key & send result to front-end
 * Queries db for all tasks associated with username
 * 
 * @param request: {username:""}
 * @param response - HTTP response object to send to client
 * @returns - {taskList: taskArray}
 */
exports.getTasks = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    const getReqBody = request.body;
    let theUserTasks = await dbUtils.getMemberScheduledTasks(getReqBody.username);
    const taskArray = [];
    if (!theUserTasks) {
      response.send({taskList: taskArray});
    } else {
      for (const task of theUserTasks) {
        taskArray.push({
          "name": task.taskname,
          "startDate": task.starttime,
          "endDate": task.endtime,
          "tag": task.tasktag,
          "complete": task.complete,
          "checkedIn": task.checkedin,
          "taskid": task.scheduledid,
        })
      }
      response.send({taskList: taskArray});
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}


/** 
 * Adds task to database, returns code 200 on success
 * Inserts task described in request body into the database
 * NOTE: any Date() in the request body must have been converted to a UTC string with the "new Date().toUTCString()" method
 * 
 * @param request: {username:"", taskName:"", startDate:"", endDate:"", tag:""}
 * @param response - HTTP response object to send to client
 * @returns - taskid of the inserted task
 */
exports.scheduletask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    
    // check createtask() in HomePage.js, it's formatted like below.
    // Also check objects.js to see how to format Task() objects.
    const schedReqBody = request.body;
    if (!schedReqBody || !schedReqBody.username || !schedReqBody.taskName || !schedReqBody.startDate || !schedReqBody.endDate || !schedReqBody.tag) {
      response.status(500).send();
    } else {
      let presetid = uuidv4();
      let scheduledid = uuidv4();
      let result = await dbUtils.insertTask(schedReqBody.username, schedReqBody.taskName, schedReqBody.startDate, schedReqBody.endDate, schedReqBody.tag, presetid, scheduledid);
      response.status(200).send({taskid: result[1].scheduledid, complete: result[1].complete, checkedIn: result[1].checkedin, endDate: result[1].endtime, name: result[0].taskname, startDate: result[1].starttime, username: result[0].username, tag: result[0].tasktag});
    }
  }
  catch (error) {
    sendError.sendError(error);
  }
}

/** 
 * Updates task parameters using ID as primary key
 * Updates task with whatever data is sent in body (some fields may be received as blank)
 * 
 * @param request: {taskId:"", taskName:"", startDate:"", endDate:"", tag:"", complete:"" }
 * @param response - HTTP response object to send to client
 * @returns - {success: true}
 */
exports.updateTask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const updateTaskReqBody = request.body;
    dbUtils.updateTask(updateTaskReqBody.taskId, updateTaskReqBody.startDate, updateTaskReqBody.endDate, 
      updateTaskReqBody.tag, updateTaskReqBody.complete, updateTaskReqBody.checkedIn);
    response.send({success: true});
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}

/** 
 * Returns a list of all tags a user should have in their dropdown menu
 * Queries DB with username that is sent passed in
 * 
 * @param request: {username:"" }
 * @param response - HTTP response object to send to client
 * @returns - {tagList: []}
 */
exports.fetchTags = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    const fetchTagsReqBody = request.body;
    // console.log('gothere.5');
    let userTags = await dbUtils.getUserTags(fetchTagsReqBody.username);
    // let userTags = false;

    // remove duplicates from userTags
    if (userTags) {
      userTags = [...new Set(Object.values(userTags))];
    } else {
      userTags = [];
    }

    const tagArray = ['Work', 'Study', 'Exercise', 'Chores', 'Socialization', 'Hobbies', 'Rest', 'Nourishment', 'Relaxation'];
    userTags.push(...tagArray);
    response.send({tagList: userTags});
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}

/** 
 * Sets up environment for testing
 * 
 * @param request: HTTP response object to recieved from client
 * @param response - HTTP response object to send to client
 * @returns - undefined - No return value
 */
exports.setuptesting = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    response.status(201).send({hi2: 'hello2'});
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}
