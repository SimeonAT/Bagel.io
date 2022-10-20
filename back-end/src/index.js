/* ---- SOURCES UTILIZED ----
 * - https://www.geeksforgeeks.org/how-to-connect-node-js-with-react-js/
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://www.npmjs.com/package/nodemon  
 * - https://expressjs.com/en/4x/api.html#req
 * - https://expressjs.com/en/4x/api.html#express.json
 * - https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
 * - https://expressjs.com/en/api.html#res
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * - https://nodejs.org/en/knowledge/getting-started/what-is-require/
 * - https://jsdoc.app/about-getting-started.html
 * - https://www.npmjs.com/package/body-parser
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
 * */
require('dotenv').config();

//import "objects.js"; import these files somehow?

const express = require("express");
const bodyParser = require("body-parser");
const testDB = require("./testDB");
const sendError = require("./sendError");
const tasks = require("./tasks");
const verify = require("./verify");

const server = express();
const PORT = 8000;

/* FIXME: bodyParser.text() can return JSON as text,
          which the front-end can parse as JSON.

          However, doing bodyParser.json() to parse the HTTP
          Request's body will give an empty JSON object: "{}".

          Any help to fix this would be greatly appreciated.
*/
server.use(bodyParser.text());

/** 
 * Task Class we will be using
 */
 class Task {
  constructor(name, startDate, endDate, tag, complete) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.tag = tag;
    this.complete = complete;
  }
}

/** Temporary Task Objects that will allow us to test
 *  front-end's and back-end's ability to send task lists back and forth 
 */
 var tempTaskList = [];
 for(let i = 0; i < 5; i++) {
  var label = '';
  var complete = true;
    switch (i) {
      case 0:
        label = "Wake up";
        complete = true;
        break;
      case 1:
        label = "Shower";
        complete = true;
        break;
      case 2:
        label = "Go sky diving";
        complete = false;
        break;
      case 3:
        label = "Shower again";
        complete = false;
        break;
      case 4:
        label = "Tell your friends you hate skydiving";
        complete = false;
        break;
    }

    var tempTask = new Task(label, new Date(), "Work", complete );
  tempTaskList.push(tempTask);
}

/** Temporary Object that will allow us to test
 *  front-end's and back-end's ability to let
 *  users login to their dashboard. 
 */
var testDatabase = {
  user1: {username: "user1", password: "pass1", tasks: tempTaskList},
  user2: {username: "user2", password: "pass2", tasks: []}
};

/** Returns JSON indicating whether or not username
 *  is in the database
 *  
 *  @param {object} loginInfo - the object of with keys "username" and "password"
 *  @returns {boolean} inDatabase - "true" if username in database, 
 *                                  and "false" otherwise.
*/
function checkUsername(loginInfo) {
  const username = loginInfo.username;

  // If the user has an account, then their username
  // must be mapped to a defined password in the database.
  //
  if (testDatabase[username] !== undefined) {

    return true;
  } 
  else {
    return false;
  }
}

server.post("/logindatabase", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);

    if (checkUsername(loginInfo) === true) {
      const username = loginInfo.username;

      if (loginInfo.password === testDatabase[username].password) {
        response.send({
          loginAllowed: true,
          payload: testDatabase[username]
        });
        return;
      }
    }

    response.send({loginAllowed: false});
    return;
  }
  catch (error) {
    sendError.sendError(error, response);
  }
});

server.post("/register", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;
    const password = loginInfo.password;

    // If the username does not exist in DB, create new key-value pair
    if (checkUsername(loginInfo) === false) {
      const databaseEntry = {
        username: username,
        password: password,
        tasks: []
      };
      testDatabase[username] = databaseEntry;

      response.send({
        loginAllowed: true,
        payload: databaseEntry
      });
    } 
    else {
      response.send({loginAllowed: false});
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
});


/** Function to create a new task in the backend from info sent by front-end
 *  
 *  @param {object} request - task data sent from front-end
 *  @returns {boolean} - "true" if task is successfully created, and "false" otherwise.
 *                                  
*/
server.post("/scheduleTask", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    
    const payload = JSON.parse(request.body);
    const username = payload.username;
    const taskName = payload.taskName;
    const startDate = payload.startDate;
    const endDate = payload.endDate;
    const tag = payload.tag;

    let newTask = new Task(taskName, startDate, endDate, tag, false);
    testDatabase[username].tasks.push(newTask);

    response.status(200);
    var flag = testDatabase[username].tasks.length === 7 ? true : false;
    response.send(flag);
  }
  catch (error) {
    sendError.sendError(error);
  }
  
});

/** Get task list from DB using username as key & send result to front-end
 *  
 *  @param {object} request - user data sent from front-end
 *  @returns {Array(Task)} - array of task objects for the associated user
 *                                  
*/
server.post("/getTasks", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;

    //Get task list from DB using username as key
    if (checkUsername(loginInfo) === true) {
      const taskList = testDatabase[username].tasks;
      //send task list to front-end
      response.send({tasksList: taskList });
    } 
    else {
      //send empty list, which will signify that there are no tasks in the list for this user
      response.send({tasksList: [] });
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
});

// FORTESTING
// Foresting? The act of going into forests? :)
server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});













