// NOTE: modify this file, creating/editing functions and adding comments with calls to the database function you would like me to implement later in dbUtils.js.
// Then use the mock database to test it for the time being

const sendError = require("./sendError");
const objects = require("./objects");
const dbUtils = require("./dbUtils");
const { v4: uuidv4 } = require('uuid');
const { uuid } = require("uuidv4");

//CHECK OBJECTS.JS FOR MOCKDATABASE + TASK OBJ IMPLEMENTATION.
let Task = objects.Task;
let mockDatabase = new objects.mockDatabase();
let temp_user_obj = new objects.user("user1", "pass1", "");
temp_user_obj = mockDatabase.registerUser(temp_user_obj);
temp_user_obj.addTask(new Task("test", 0, new Date(), "Work", true));

exports.mockDatabase = mockDatabase;

//register new user
exports.register = async (request, response) => {
  //console.log("HELLO");
  try {
    // set response headers
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    // get username/email/password from request body
    const registerInfo = JSON.parse(request.body);    
    // check if username/email in db
    const users = await dbUtils.getMembers();
    let alreadyInUse = false;
    for (const userObj of users) {
      if (userObj.username === registerInfo.username || userObj.email === registerInfo.email) {
        alreadyInUse = true;
        break;
      }
    }
    // if username/email in db: send failure, else: insert and send success
    if (alreadyInUse) {
      console.log("Register failed - Account already exists");
      response.send({
        loginAllowed: false
      });
    } else {
      await dbUtils.insertUser(registerInfo.username, registerInfo.email, registerInfo.password);
      console.log("Register succeeded");
      response.send({
        loginAllowed: true,
      });
    }
  }
  catch (error) {
    console.log("Register failed");
    sendError.sendError(error, response);
  }
}

//login
exports.loginDatabase = async (request, response) => {
  //console.log("Here?");
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    const loginInfo = JSON.parse(request.body);
    // get users from db
    const users = await dbUtils.getMembers();
    // console.log(`loginInfo: ${JSON.stringify(loginInfo)}`);
    // console.log(`users: ${JSON.stringify(users)}`);
    // check if user in db
    let theUser = null;
    let userInDatabase = false;
    for (const userObj of users) {
      if (userObj.username === loginInfo.username && userObj.memberpassword === loginInfo.password) {
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
      // make tasks array
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
          "taskid": task.scheduledid,
        })
      }
      // console.log(`taskArray: ${JSON.stringify(taskArray)}`);
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

//Get task list from DB using username as key & send result to front-end
exports.getTasks = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    const loginInfo = JSON.parse(request.body);
    let theUserTasks = await dbUtils.getMemberScheduledTasks(loginInfo.username);
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
// NOTE: any Date() in the request body must have been 
// converted to a UTC string with the "new Date().toUTCString()" method
exports.scheduletask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    
    // check createtask() in HomePage.js, it's formatted like below.
    // Also check objects.js to see how to format Task() objects.
    const payload = JSON.parse(request.body);
    if (!payload || !payload.username || !payload.taskName || !payload.startDate || !payload.endDate || !payload.tag) {
      console.log("No payload (no body) or payload missing fields.");
      response.status(500).send();
    } else {
      let presetid = uuidv4();
      let scheduledid = uuidv4();
      // console.log(payload.startDate);
      let result = await dbUtils.insertTask(payload.username, payload.taskName, payload.startDate, payload.endDate, payload.tag, presetid, scheduledid);
      // console.log(JSON.stringify(result));
      response.status(200).send({taskid: result[1].scheduledid});
    }
  //   const username = payload.username;
  //   const taskName = payload.taskName;
  //   const startDate = payload.startDate;
  //   const endDate = payload.endDate;
  //   const tag = payload.tag;

  //   var userObj = mockDatabase.getUser(username);
  //   let newTask;
  //   if(payload !== undefined) {
  //     newTask = new Task(taskName, startDate, endDate, tag, true);
  //   } else {
  //     console.log("No payload (no body) added.");
  //     newTask = new Task("Test_task", 0, new Date(), 1, true);
  //   }
  //   //let newTask = new Task("Test_task", new Date(), 1, true);
  //   userObj.addTask(newTask);
  //   console.log("PRINT USER DATABASE STORAGE:\n",userObj);
  //   //taskList.addTask(date.getTime(),newTask);

  //   response.status(200);
  //   //response.send(testDatabase[username].tasks);
  //   response.send(userObj.tasks);
  }
  catch (error) {
    sendError.sendError(error);
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
