// FRONT END PEOPLE: modify this file, creating/deleting functions and adding comments with calls to the database function you would like me to implement later in dbUtils.js.
// Then use the mock database to test it for the time being

const sendError = require("./sendError");
const objects = require("./objects");
const dbUtils = require("./dbUtils");

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
    console.log(`loginInfo: ${JSON.stringify(loginInfo)}`);
    console.log(`users: ${JSON.stringify(users)}`);
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
    console.log(`userInDatabase: ${userInDatabase}`);
    if (userInDatabase) {
      // get tasks from db
      let theUserTasks = await dbUtils.getMemberScheduledTasks(theUser.username);
      console.log(`theUser: ${JSON.stringify(theUser)}`);
      console.log(`theUserTasks: ${JSON.stringify(theUserTasks)}`);
      // make tasks array
      let payloadObj = {
        "username": theUser.username,
        "password": theUser.memberpassword,
        "email": theUser.email,
        "tasks": [
          {
            "name": theUserTasks.taskname,
            "startDate": theUserTasks.starttime,
            "endDate": theUserTasks.endtime,
            "tag": theUserTasks.tasktag,
            "complete": theUserTasks.complete,
          }
        ]
      };
      console.log(`payloadObj: ${JSON.stringify(payloadObj)}`);
      response.send({
        loginAllowed: true,
        payload: payloadObj
      });
    } else {
      response.send({loginAllowed: false});
    }
  } catch (error) {
    console.log("Login unsuccessful");
    sendError.sendError(error, response);
  }
}

// NOT CONNECTED TO DB
//Get task list from DB using username as key & send result to front-end
exports.getTasks = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;

    if (mockDatabase.getTasks(username) === null) {
      response.send({taskList: []});
    } else {
      response.send({taskList: mockDatabase.getTasks(username)})
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
}

// NOT CONNECTED TO DB
//when scheduling a task please have proper "taskInfo" string field.
exports.scheduletask = async (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    
    //check createtask() in HomePage.js, it's formatted like below.
    //Also check objects.js to see how to format Task() objects.
    const payload = JSON.parse(request.body);
    const username = payload.username;
    const taskName = payload.taskName;
    const startDate = payload.startDate;
    const endDate = payload.endDate;
    const tag = payload.tag;

    var userObj = mockDatabase.getUser(username);
    let newTask;
    if(payload !== undefined) {
      newTask = new Task(taskName, startDate, endDate, tag, true);
    } else {
      console.log("No payload (no body) added.");
      newTask = new Task("Test_task", 0, new Date(), 1, true);
    }
    //let newTask = new Task("Test_task", new Date(), 1, true);
    userObj.addTask(newTask);
    console.log("PRINT USER DATABASE STORAGE:\n",userObj);
    //taskList.addTask(date.getTime(),newTask);

    response.status(200);
    //response.send(testDatabase[username].tasks);
    response.send(userObj.tasks);
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
