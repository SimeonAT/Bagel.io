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
// const objects = require("./objects");
const express = require("express");
const bodyParser = require("body-parser");
// const sendError = require("./sendError");
// const { response } = require('express');
// const { replicationStart } = require('pg-protocol/dist/messages.js');
const tasks = require("./tasks");
// const verify = require("./verify");

const server = express();
// const PORT = 8000;

/* FIXME: bodyParser.text() can return JSON as text,
          which the front-end can parse as JSON.

          However, doing bodyParser.json() to parse the HTTP
          Request's body will give an empty JSON object: "{}".

          Any help to fix this would be greatly appreciated.
*/
server.use(bodyParser.text());

server.post("/register", tasks.register);
server.post("/logindatabase", tasks.loginDatabase);
server.post("/getTasks", tasks.getTasks);
server.post("/scheduletask", tasks.scheduletask);
server.post("/updateTask", tasks.updateTask);

// FORTESTING
server.get("/testdb", tasks.testDBGet);

// server.listen(PORT, () => {
//   console.log("Server is working");
// });

exports.server = server;