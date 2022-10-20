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
const objects = require("./objects");

//import "objects.js"; import these files somehow?

const express = require("express");
const bodyParser = require("body-parser");
const testDB = require("./testDB");
const sendError = require("./sendError");
const { response } = require('express');
const { replicationStart } = require('pg-protocol/dist/messages.js');
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

//CHECK OBJECTS.JS FOR MOCKDATABASE + TASK OBJ IMPLEMENTATION.
//IMPORTANT
//Mock-database
var Task = objects.Task; //dear god fix this.
var mockDatabase = new objects.mockDatabase();
var temp_user_obj = new objects.user("user1", "pass1", "");
temp_user_obj = mockDatabase.registerUser(temp_user_obj);
temp_user_obj.addTask(new Task("test", 0, new Date(), "Work", true));
//var tempTask = new Task(label, new Date(), "Work", complete );

console.log("LOAD MOCK DATABASE", mockDatabase); //check mockdatabase.

//register new user.
server.post("/register", (request, response) => {
  //console.log("HELLO");
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;
    const password = loginInfo.password;

    // If the username does not exist in DB, create new key-value pair
    var userObj = new objects.user(username, password, "");
    var added = mockDatabase.registerUser(userObj);
    if(added !== null) {
      response.send({
        loginAllowed: true,
        payload: added
      });
    } else {
      response.send({
        loginAllowed: false
      });
    }
  }
  catch (error) {
    console.log("Register failed");
    sendError.sendError(error, response);
  }
});

server.post("/logindatabase", (request, response) => {
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
});

//Get task list from DB using username as key & send result to front-end
server.post("/getTasks", (request, response) => {
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
});

//when scheduling a task please have proper "taskInfo" string field.
server.post("/scheduletask", (request, response) => {
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
  
});

// FORTESTING
server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});