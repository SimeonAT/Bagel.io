const sendError = require("./sendError");
const objects = require("./objects");

let Task = objects.Task; //dear god fix this.
let mockDatabase = new objects.mockDatabase();
let temp_user_obj = new objects.user("user1", "pass1", "");
temp_user_obj = mockDatabase.registerUser(temp_user_obj);
temp_user_obj.addTask(new Task("test", 0, new Date(), "Work", true));

exports.register = async (request, response) => {
  //console.log("HELLO");
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;
    const password = loginInfo.password;
    console.log("Registration Info: ", loginInfo);
    // If the username does not exist in DB, create new key-value pair
    var userObj = new objects.user(username, password, "");
    var added = mockDatabase.registerUser(userObj);
    if(added !== null) {
      console.log("Register succeeded");
      response.send({
        loginAllowed: true,
        payload: added
      });
    } else {
      console.log("Register failed - Account already exists");
      response.send({
        loginAllowed: false
      });
    }
  }
  catch (error) {
    console.log("Register failed");
    sendError.sendError(error, response);
  }
}

exports.loginDatabase = async (request, response) => {
  //console.log("Here?");
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);

    var userObj = new objects.user(loginInfo.username, loginInfo.password, "");
    var user = mockDatabase.loginUser(userObj);
    //response.send({loginAllowed: false});
    if(user !== null) {
      console.log("Login successful");
      console.log(user);
      response.send({
        loginAllowed: true,
        payload: user
      });
      return;
    } else {
      response.send({loginAllowed: false});
    }

  } catch (error) {
    console.log("Login unsuccessful");
    sendError.sendError(error, response);
  }
}

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

// //Data sent when creating a pre-set task.
// exports.tasks = async (request, response) => {
//   try {
//     response.set("Access-Control-Allow-Origin", "*");
//     response.setHeader("Content-Type", "application/json");
  
//     var taskInfo = JSON.parse(request.body);


//     //Send to the testDB server.
//     //receieve success or fail based on whether task was added successfully or not
//     const taskAdded = true; //SOME FUNCTION HERE TO ADD THE TASK AND RETURN TRUE/FALSE.
    
//     //Send task added status.
//     if(taskAdded) {
//       response.send("Task Created"); //confirm task
//     } else {
//       response.send("Task Not Created"); //task failed
//     }
//   } catch (error) {
//     sendError.sendError(error, response);
//   }
//   //Also return a set of pre-set tasks
// }

// /** 
//  * Task Class we will be using
//  */
// class Task {
//   constructor(name, startDate, endDate, tag, complete) {
//     this.name = name;
//     this.startDate = startDate;
//     this.endDate = endDate;
//     this.tag = tag;
//     this.complete = complete;
//   }
// }

// /** Temporary Task Objects that will allow us to test
// *  front-end's and back-end's ability to send task lists back and forth 
// */
// let tempTask1 = new Task("Wake up", new Date(), "Work", true);
// let tempTask2 = new Task("Shower", new Date(), "Work", true);
// let tempTask3 = new Task("Go sky diving", new Date(), "Work", false);
// let tempTask4 = new Task("Shower again", new Date(), "Work", false);
// let tempTask5 = new Task("Tell your friends you hate skydiving", new Date(), "Work", false);
// let tempTaskList = [tempTask1, tempTask2, tempTask3, tempTask4, tempTask5];

// /** Temporary Object that will allow us to test
//  *  front-end's and back-end's ability to let
//  *  users login to their dashboard. 
//  */
// var testDatabase = {
//   user1: {username: "user1", password: "pass1", tasks: tempTaskList},
//   user2: {username: "user2", password: "pass2", tasks: []}
// };

// for(let i = 0; i < 5; i++) {
//   var label = '';
//   var complete = true;
//   switch (i) {
//     case 0:
//       label = "Wake up";
//       complete = true;
//       break;
//     case 1:
//       label = "Shower";
//       complete = true;
//       break;
//     case 2:
//       label = "Go sky diving";
//       complete = false;
//       break;
//     case 3:
//       label = "Shower again";
//       complete = false;
//       break;
//     case 4:
//       label = "Tell your friends you hate skydiving";
//       complete = false;
//       break;
//   }
//   var tempTask = new Task(label, new Date(), "Work", complete );
//   tempTaskList.push(tempTask);
// }

// /** Returns JSON indicating whether or not username
//  *  is in the database
//  *  
//  *  @param {object} loginInfo - the object of with keys "username" and "password"
//  *  @returns {boolean} inDatabase - "true" if username in database, 
//  *                                  and "false" otherwise.
// */
// function checkUsername(loginInfo) {
//   const username = loginInfo.username;
//   // If the user has an account, then their username
//   // must be mapped to a defined password in the database.
//   //
//   if (testDatabase[username] !== undefined) {
//     return true;
//   } 
//   else {
//     return false;
//   }
// }

//Pre-set task structure. //? Probably have to move this somewhere else later?

// class task {
//   constructor() {
//     this.id;     //unique ID for referencing.
//     this.extra;  //allows us to extend task functionality.
//   }
// };

//This will send pre-set tasks to the front-end, the front-end will keep them saved in browser.
//Front end will have HASH for each pre-set task.
//server.post("/returnTasks", (request, response) => return a list of preset tasks [array])
//Most importantly, it will return a specific hash/id referring to the task.

//Object sent when scheduling/recording tasks. //move this to front end?

// class scheduleTask {
//   constructor() {
//     this.taskID; //taskID referred to.
//     this.start;  //start time of task
//     this.duration; //duration of task being added.
//   }
// };

// exports.scheduleTask = async (request, response) => {
//   try {
//     response.set("Access-Control-Allow-Origin", "*");
//     response.setHeader("Content-Type", "application/json");

//     var infoForTask = JSON.parse(request.body);

//     //Get the current time, convert to UNIX timestamp
//     var currentDate = new Date();
//     var currentTime = currentDate.getTime();
//     const unixTimeStamp = currentTime/1000; //Get the UNIX date timestamp.

//     var sendTask = new scheduleTask();
//     sendTask.taskID = 0; //do this?
//     sendTask.start = 0; //when you started the task.
//     //sendTask.start = unixTimeStamp;
//     sendTask.duration = 0; //get this from infoForTask

//     //Send "sendTask" to database
//     var sendTaskWork = true;
//     if(sendTaskWork) {
//       response.send("Task recorded");
//     } else {
//       response.send("Task not recorded");
//     }
//   } catch (error) {
//     sendError.sendError(error, response);
//   }
// }