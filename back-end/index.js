/* ---- SOURCES UTILIZED ----
 * - https://www.geeksforgeeks.org/how-to-connect-node-js-with-react-js/
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://www.npmjs.com/package/nodemon  
*/
const express = require("express");

const server = express();
const PORT = 8000;

server.get("/login", (request, response) => {
  console.log("Server received data from front-end");

  response.set("Access-Control-Allow-Origin", "*");
  response.send("Hello World!");
});

server.listen(PORT, () => {
  console.log("Server is working");
});
