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
*/
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

/** Returns JSON indicating whether or not 
 *  username and password combination is in the database.
 *  
 *  @param {object} loginInfo - the object of with keys "username" and "password"
 *  @returns {boolean} inDatabase - "true" if username and password in
 *                                  database, and "false" otherwise.
*/
function checkDatabase(loginInfo) {
  const username = loginInfo.username;
  const password = loginInfo.password;

  // If the user has an account, then their username
  // must be mapped to a defined password in the database.
  //
  if ((testDatabase[username] !== undefined) &&
      (password === testDatabase[username])) {

    return true;
  } 
  else {
    return false;
  }

  return; 
}

server.post("/logindatabase", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    if (checkDatabase(loginInfo) === true) {
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

server.post("/register", (request, response) => {
  try {
    response.set("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
  
    const loginInfo = JSON.parse(request.body);
    const username = loginInfo.username;
    const password = loginInfo.password;

    // If the username does not exist in DB, create new key-value pair
    if (testDatabase[username] === undefined) {
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

server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});













