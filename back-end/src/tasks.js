// NOTE: modify this file, creating/editing functions and adding comments with calls to the database function you would like me to implement later in dbUtils.js.
// Then use the mock database to test it for the time being

const sendError = require("./sendError");
const dbUtils = require("./dbUtils");
const { v4: uuidv4 } = require('uuid');
const { user } = require("pg/lib/defaults");

// //CHECK OBJECTS.JS FOR MOCKDATABASE + TASK OBJ IMPLEMENTATION.
// const objects = require("./objects");
// let Task = objects.Task;
// let mockDatabase = new objects.mockDatabase();
// let temp_user_obj = new objects.user("user1", "pass1", "");
// temp_user_obj = mockDatabase.registerUser(temp_user_obj);
// temp_user_obj.addTask(new Task("test", 0, new Date(), "Work", true));
// exports.mockDatabase = mockDatabase;

// register new user
// <Inputs> request body: {username:"", email:"", password:""}
// <Functionality> compares given username & email with the usernames & emails in db
// if no duplicates, adds given username, email, password to database
// <Returns> sends response with body: {loginAllowed: true} if register successful,
// {loginAllowed: false} if unsuccessful
exports.register = async (request, response) => {
  try {
    // set response headers
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    // get username/email/password from request body
    const registerReqBody = JSON.parse(request.body);    
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
      console.log("Register failed - Account already exists");
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
      console.log("Register succeeded");
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
    console.log("Register failed");
    sendError.sendError(error, response);
  }
}

// Log user in
// <Inputs> request body: {username:"", email:"", password:""}
// <Functionality> compares given username & password with the usernames & passwords in db
// <Returns> sends response with body: {loginAllowed: true, payload: {}} if match,
// {loginAllowed: false} if no match
exports.loginDatabase = async (request, response) => {
  //console.log("Here?");
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const loginReqBody = JSON.parse(request.body);
    // get users from db
    const users = await dbUtils.getMembers();
    // console.log(`loginInfo: ${JSON.stringify(loginInfo)}`);
    // console.log(`users: ${JSON.stringify(users)}`);
    // check if user in db
    let theUser = null;
    let userInDatabase = false;
    for (const userObj of users) {
      if (userObj.username === loginReqBody.username && userObj.memberpassword === loginReqBody.password) {
        userInDatabase = true;
        theUser = userObj;
        break;
      }
    }
    // console.log(`userInDatabase: ${userInDatabase}`);
    if (userInDatabase) {
      // get tasks from db
      let theUserTasks = await dbUtils.getMemberScheduledTasks(theUser.username);
      // console.log(`theUser: ${JSON.stringify(theUser)}`);
      // console.log(`theUserTasks: ${JSON.stringify(theUserTasks)}`);
      // make task array
      const taskArray = [];
      for (const task of theUserTasks) {
        // console.log(`(loginDatabase)taskid: ${task.scheduledid}`);
        // console.log(`task: ${JSON.stringify(task)}`);
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
      // console.log(`taskArray: ${JSON.stringify(taskArray)}`);
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
      response.send({loginAllowed: false});
    }
  } catch (error) {
    console.log("Login unsuccessful");
    sendError.sendError(error, response);
  }
}

// Get task list from DB using username as key & send result to front-end
// <Inputs> request body: {username:""}
// <Functionality> queries db for all tasks associated with username
// <Returns> sends response with body: {taskList: taskArray}
exports.getTasks = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    const getReqBody = JSON.parse(request.body);
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

// Adds task to database, returns code 200 on success
// <Inputs> request body: {username:"", taskName:"", startDate:"", endDate:"", tag:""}
// <Functionality> inserts task described in request body into the database
// <Returns> taskid of the inserted task
// NOTE: any Date() in the request body must have been 
// converted to a UTC string with the "new Date().toUTCString()" method
exports.scheduletask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    
    // check createtask() in HomePage.js, it's formatted like below.
    // Also check objects.js to see how to format Task() objects.
    const schedReqBody = JSON.parse(request.body);
    if (!schedReqBody || !schedReqBody.username || !schedReqBody.taskName || !schedReqBody.startDate || !schedReqBody.endDate || !schedReqBody.tag) {
      console.log("No request body or request body missing fields.");
      response.status(500).send();
    } else {
      let presetid = uuidv4();
      let scheduledid = uuidv4();
      // console.log(payload.startDate);
      let result = await dbUtils.insertTask(schedReqBody.username, schedReqBody.taskName, schedReqBody.startDate, schedReqBody.endDate, schedReqBody.tag, presetid, scheduledid);
      // console.log(JSON.stringify(result));
      response.status(200).send({taskid: result[1].scheduledid, complete: result[1].complete, checkedIn: result[1].checkedin, endDate: result[1].endtime, name: result[0].taskname, startDate: result[1].starttime, username: result[0].username, tag: result[0].tasktag});
    }
  }
  catch (error) {
    sendError.sendError(error);
  }
}

// Updates task parameters using ID as primary key
// <Inputs> request body: {taskId:"", taskName:"", startDate:"", endDate:"", tag:"", complete:"" }
// <Functionality> updates task with whatever data is sent in body (some fields may be received as blank)
// <Returns> sends response with body: {success: true}
exports.updateTask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const updateTaskReqBody = JSON.parse(request.body);
    dbUtils.updateTask(updateTaskReqBody.taskId, updateTaskReqBody.startDate, updateTaskReqBody.endDate, 
      updateTaskReqBody.tag, updateTaskReqBody.complete, updateTaskReqBody.checkedIn);
    response.send({success: true});
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}


// Returns a list of all tags a user should have in their dropdown menu
// <Inputs> request body: {username:"" }
// <Functionality> queries DB with username that is sent passed in
// <Returns> sends response with body: {tagList: []}
exports.fetchTags = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    const fetchTagsReqBody = JSON.parse(request.body);
    // const fetchTagsReqBody = request.body; //FORTESTING

    let userTags = await dbUtils.getUserTags(fetchTagsReqBody.username);
    //console.log('userTags:' + userTags.tasktag);
    //const tagArray = userTags;
    const tagArray = ['Work', 'Study', 'Exercise', 'Chores', 'Socialization', 'Hobbies', 'Rest', 'Nourishment', 'Relaxation'];
    response.send({tagList: tagArray});
  }

  catch (error) {
    sendError.sendError(error, response);
  }
}

exports.setuptesting = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    console.log(`typeof(request.body): ${typeof(request.body)}`);
    console.log(`JSON.stringify(request.body): ${JSON.stringify(request.body)}`);
    response.status(201).send({hi2: 'hello2'});
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}


// FORTESTING
exports.testDBGet = async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  const queryResult = await dbUtils.selectAll();
  response.status(200).json({displayStr: `Miliseconds Since 1970: [${new Date().getTime()}], 
      First DB Entry Inserted At: [${queryResult}]`});
};
