/* ---- SOURCES UTILIZED ----
 * - https://www.geeksforgeeks.org/how-to-connect-node-js-with-react-js/
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://www.npmjs.com/package/nodemon  
 * - https://expressjs.com/en/4x/api.html#req
 * - https://expressjs.com/en/4x/api.html#express.json
 * - https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
*/
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const testDB = require("./testDB");

const server = express();
const PORT = 8000;

/* FIXME: bodyParser.text() can return JSON as text,
          which the front-end can parse as JSON.

          However, doing bodyParser.json() causes problems.

          Any help to fix this would be greatly appreciated.
*/
server.use(bodyParser.text());

server.post("/logindatabase", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "application/json");
  response.send(request.body);
});

server.post("/register", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.send("Register information will be sent.");
});

server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});













