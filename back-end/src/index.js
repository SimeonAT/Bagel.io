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
 * */
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const testDB = require("./testDB");
const sendError = require("./sendError");

const server = express();
const PORT = 8000;

/* FIXME: bodyParser.text() can return JSON as text,
          which the front-end can parse as JSON.

          However, doing bodyParser.json() to parse the HTTP
          Request's body will give an empty JSON object: "{}".

          Any help to fix this would be greatly appreciated.
*/
server.use(bodyParser.text());

/** Temporary Object that will allow us to test
 *  front-end's and back-end's ability to let
 *  users login to their dashboard. 
 */
var testDatabase = {
  user1: "pass1",
  user2: "pass2"
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

      if (loginInfo.password === testDatabase[username]) {
        response.send({loginAllowed: true});
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

    // If the username does not exist in DB, create new key-value pair
    if (checkUsername(loginInfo) === false) {
      const username = loginInfo.username;
      const password = loginInfo.password; 
      testDatabase[username] = password;

      response.send({loginAllowed: true}); 
    } 
    else {
      response.send({loginAllowed: false});
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
});


//Pre-set task structure. //? Probably have to move this somewhere else later?
class task {
  constructor() {
    this.id;     //unique ID for referencing.
    this.extra;  //allows us to extend task functionality.
  }
};

//Data sent when creating a pre-set task.
server.post("/tasks", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    var taskInfo = JSON.parse(request.body);


    //Send to the testDB server.
    //receieve success or fail based on whether task was added successfully or not
    const taskAdded = true; //SOME FUNCTION HERE TO ADD THE TASK AND RETURN TRUE/FALSE.
    
    //Send task added status.
    if(taskAdded) {
      response.send("Task Created"); //confirm task
    } else {
      response.send("Task Not Created"); //task failed
    }
  }
  catch (error) {
    sendError.sendError(error, response);
  }
});

//Object sent when scheduling/recording tasks. //move this to front end?
class scheduleTask {
  constructorO() {
    this.taskID; //taskID referred to.
    this.start;  //start time of task
    this.duration; //duration of task being added.
  }
};

//Data sent to server when recording a task being done
server.post("/scheduleTask", (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");

    var infoForTask = JSON.parse(request.body);

    //Get the current time, convert to UNIX timestamp
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    const unixTimeStamp = currentTime/1000; //Get the UNIX date timestamp.

    var sendTask = new scheduleTask();
    sendTask.taskID = 0; //do this?
    sendTask.start = unixTimeStamp;
    sendTask.duration = 0; //get this from infoForTask

    //Send "sendTask" to database
    var sendTaskWork = true;
    if(sendTaskWork) {
      response.send("Task recorded");
    } else {
      response.send("Task not recorded");
    }
});


server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});













