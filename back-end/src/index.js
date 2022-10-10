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
const testDB = require("./testDB");

const server = express();
const PORT = 8000;

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













