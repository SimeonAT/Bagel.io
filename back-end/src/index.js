/* ---- SOURCES UTILIZED ----
 * - https://www.geeksforgeeks.org/how-to-connect-node-js-with-react-js/
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://www.npmjs.com/package/nodemon  
*/
require('dotenv').config();

const express = require("express");

const testDB = require("./testDB");

const server = express();
const PORT = 8000;

server.get("/login", (request, response) => {
  console.log("Server received data from front-end");

  response.set("Access-Control-Allow-Origin", "*");
  response.send("Login information will be sent.");
});

server.get("/register", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.send("Register information will be sent.");
});

server.get("/testdb", testDB.get);

server.listen(PORT, () => {
  console.log("Server is working");
});













